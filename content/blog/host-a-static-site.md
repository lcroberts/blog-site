+++
title = "Making and Hosting a Static Site (The Hard Way)"
author = ["Logan Roberts"]
date = 2023-08-10T00:00:00-04:00
categories = ["Tutorial"]
tags = ["Linux", "Server Admin"]
draft = true
toc = true
+++

> Edit as of January 12, 2024: I have switched over to hosting on
> github pages. While this was a great experience to go through and I learned a
> lot, I have not been as diligent maintaining it as I would have liked and the
> site occasionally had ssl issues. Sometimes it's best to do things the hard way
> for the learning experience and then switch to the easy way to avoid problems.
>
> As of July 6, 2024 I have also moved over to the hugo static site generator as well.

This is a guide on making a website using a static site generator and
self-hosting it on a VPS. It'll also walk through getting a domain, setting up
DNS, and setting up a webserver. Additionally we will automate publishing the
changes made in a git repo to the server so that you don't have to manually
deploy every change you make.

While you can also forgo self-hosting and instead using something like GitHub
Pages I think that the process of doing things the harder way is a valuable
learning experience. If you do want to use GitHub pages instead of a VPS there
are plenty of guides for that as well.


## Making the Site {#making-the-site}

While it doesn't really matter which order you do the first 2 steps in, making
a site takes the longest while the rest can all be done in one go. To make the
site you can use any static site generator of your choice. I'm using
[zola](https://www.getzola.org/) but you can use Jekyll, Hugo, or any of the
other myriad of options.

If you decide to use zola, you'll first need to install it as per your
operating system. Once you do that you'll need to find a theme you want to use,
unless you're comfortable with html and css and want to make one yourself.
Personally I'm using [blow](https://www.getzola.org/themes/blow/). You'll want
to initialize a git repo and run "zola init" within it. Using git allows you to
roll back changes if you make a mistake and will also be what powers the
automatic deployment of our site. Most zola themes generally have you add the
repo for them as a submodule of the git repo but this can cause problems with
the build stage of the project. To solve this I recommend cloning the theme
repo elsewhere and copying the files (without the git ones) into the
appropriate theme directory in your zola project. Make sure you include the
readme and any licenses as well.

Once you have the theme installed you can always test that the website works by
running "zola serve" this will create a local webserver so that you can view
the website. From here the process will vary depending on the theme. Generally
the themes will have example file structures somewhere so you can see how they
are used, and they will also tell you all the options they have. So from here
you can customize/configure the theme, and add content.

Here are a few things that might help with the process:

-   All content that is transformed into a webpage will be put into the content folder.
-   Anything that will be embedded in a page should be put into the static folder. The content can then be accessed by using the path to the content using the static folder as the root. So if you have an image with the path "static/img/blog/example.png" you can access it with the markdown:

<!--listend-->

```markdown
![alt_text_here](/img/blog/example.png)
```

-   Folders without content will not be tracked by the git repo. This can cause problems if you do not add any custom templates into the templates directory as zola requires the folder to be present to build a website. To get around this you can put a filler text file in the template directory. You can also clone the repo elsewhere and run "zola build" to see if the project will properly build or is missing a required folder.

Once you feel your site is where you want it to be you can move onto the next
step. If you are stuck you can see if you can find any solutions to your
problems by looking at [my git repo](https://github.com/lcroberts/blog-site).


## Getting a Domain {#getting-a-domain}

Before you can do much else you will need a domain. There are free options such
as [duck dns](https://www.duckdns.org/), but I recommend buying a domain name
and using that. You can buy your domain from any domain registrar such as
[Cloudflare](https://www.cloudflare.com/products/registrar/) or [Google
Domains](https://domains.google/). Personally I'm using
[namecheap](https://www.namecheap.com/) for no other reason that I was able to
save a few bucks by going through them. If you see anything about buying SSL
certificates anywhere you can ignore those as we will be getting those
ourselves as part of setting up a VPS.

Domain prices vary by the Top Level Domain (TLD), and often shorter domains
come at a premium. With a little bit of looking around you can likely find
something thats fairly affordable and short. I was able to get lcroberts.dev
for about $10 a year. Once you purchase a domain it will take a little bit for
the whole registration process to complete. While waiting you can continue on
with the guide.


## Setting up DNS {#setting-up-dns}

To set up DNS we will need to know the IP address we will be pointing to. To
get this we need to provision a VPS (I recommend using either Debian or Ubuntu
as the OS. I will be using Debian though all commands should be that same on
Ubuntu.), while you can use any provider I personally use
[Linode](https://www.linode.com/). I do this for 2 reasons, they have their own
DNS name servers and there is a linode plugin for certbot (though Linode
doesn't support DNSSEC), and I've been using them for a while since they have
fairly rich doccumentation and a wide variety of guides.

Regardless of the hosting service you use you can probably get away with the
smallest instance type. Running a simple static site takes virtually no
resources and you could likely host multiple sites on a single instance as long
as traffic is low.

Once you have the instance IP address you can either add the appropriate A/AAAA
records to where your name servers are currently being hosted or you can do
what I did and use Linodes name servers. If you are using Linodes name servers
you will first need to go to the sidebar and select domains. You can then
either import a zone or hit the create domain button. Once you hit the create
button you will then be prompted to enter your domain, so for me that was
lcroberts.dev, an SOA email address, and you can choose what kind of default
records to insert. To make things easy you can select "Insert default records
from one of my Linodes" and then select the instance you are planning to host
the site on. This will generate records that look something like this: \![Image
of dns records](/images/blog/making-a-website/dns-records.png)

From here you will want to go to your domain regirstrar and change the name
servers to those listed under the NS Record section of the domain page. Once
you do that you are ready to move onto the next step.


## Setting up a VPS and a Github Action {#setting-up-a-vps-and-a-github-action}


### Securing The Server {#securing-the-server}

Before we do anything else we will first want to do some basic security setup
for the server. If you do not already have an SSH key you use you will want to
make one. On Linux and MacOS you can run the command "ssh-keygen -t rsa -b
4096" which will create as rsa keypair that 4096 bits long. Windows also has
OpenSSH support and has a ssh-keygen binary, though the syntax may be slightly
different (I have not tested this but feel free to try the command above with
ssh-keygen.exe instead of ssh-keygen). You will be provided the option the add
a passphrase to the key as well as the name. You will generally want to use the
default name assuming you do not already have an existing key, this will be the
default key used by SSH. The generated key will be stored in your user folder
under a ".ssh" directory (this is the same across all OS) and consists of two
parts. The file that ends in ".pub" is the public key and is what you will be
providing to the server. The other file is the private key and should never be
shown to others.

From here you will need to access the server. If you are using Linode you can
either use the Lish console or run "ssh root@server_ip" and provide the root
password you provided upon instance creation. Once you are in we will have a
few things we need to do. All commands have been tested for Debian 11, though
they should work the same for any Debian derivative such as Ubuntu. First we
will want to run

```bash
sudo apt update && sudo apt upgrade
```

This ensures all packages on the system are up to date. We are currently logged
in as the root user which is a bad security practice, so we will want to make a
new user and make sure that user has sudo privileges. This process can vary
slightly but for Debian based distros you can run

```bash
sudo useradd -mg sudo username_here
```

This creates a new user with a home directory and adds them to the sudo group.
This allows them to run commands with root privileges but we will want to
protect this behind a password so we will run the following command to setup a
password for the user as well as change the users shell to bash which allows
for command completion.

```bash
sudo passwd username_here
sudo chsh -s /bin/bash username_here
```

This will prompt you to enter a password for the user. Make this something you
will be able to remember and that you can easily put in. Next we will want to
switch to the next user and ensure that the user can use sudo to run commands
as root. We will test this by using the newly added user to install rsync which
will be required to automatically deploy website changes. To do this run the
following commands:

```bash
su username_here
sudo apt install rsync
```

Assuming you did everything correctly you should be prompted to enter the users
password and rsync should be installed or apt will tell you that the package is
already installed. Next we will want to set up pubic key authentication and
disable password authentication as well as root login over SSH. First, while
logged in as the user, run the following commands:

```bash
mkdir .ssh
touch .ssh/authorized_keys
```

After this you will need to get the public key from your SSH keypair you made
earlier. Then you will want to open the authorized_keys file using your command
line text editor of choice. Common options are vi/vim and nano. For beginners
nano may be easier but learning the vi keybinds can be very valuable. The
command using nano is:

```bash
nano .ssh/authorized_keys
```

You will then want to copy the public key to your clipboard then use
ctrl+shift+v to paste the key into the file. Then press ctrl+x and answer yes
when prompted if you want to save the file. Hit enter when it asks where you
want to save the file. Once you've done this we will want to test to make sure
you did it correctly. Enter "exit" repeatedly until you've exited the SSH
prompt, then enter the following command to connect to the server as your new
user.

```bash
ssh username_here@server_ip
```

If it lets you in without a prompt for your password then the SSH key
authentication worked. Now we will want to change the SSH daemon setting to
disable password authentication and root login. To do this run:

```bash
sudo nano /etc/ssh/sshd_config
```

First, explicitly enable public key authentication by uncommenting the line
"#PubkeyAuthentication yes". You do this by removing the '#' symbol. Next find
the line that contains "PermitRootLogin", uncomment it, and change the value to
'no'. Finally, find the line that contains "PasswordAuthentication", uncomment
it, and change the value to no. Save your changes and run the following
command:

```bash
sudo systemctl restart sshd
```

This restarts the SSH daemon and ensures that our configuration options apply.


### Setting up the Webserver {#setting-up-the-webserver}

Before setting up the webserver we will set up the script for getting and
installing our SSL certificates. First, assuming you are using Linode for your
name servers you will want to get a Linode API token. You can do this by
clicking [here](https://cloud.linode.com/profile/tokens), clicking "Create A
Personal Access Token", setting the expiry to never, and removing all
permissions aside from Read/Write for domains. You will then want to download
the token. Next you will want to run the following commands:

```bash
mkdir .secrets
nano .secrets/linode.ini
```

Once you are editing the linode.ini file enter the following text and enter your actual API key.

```bash
# Linode API credentials used by Certbot
dns_linode_key = your_api_key_here
dns_linode_version = 4
```

While I'm sure there are more secure ways of doing this, this should be fine
for our purposes. From here we will want to make a script that will
automatically request and install our SSL certificates. To do this you can run
the following commands:

```bash
touch certs.sh
chmod +x certs.sh
nano certs.sh
```

Then enter the following text and insert your domain:

```bash
#!/bin/bash

sudo certbot --dns-linode -d "your.domain, *.your.domain" --dns-linode-credentials ~/.secrets/linode.ini --installer nginx
```

Next we will install nginx, certbot, and the required plugins by running the following command:

```bash
sudo apt install nginx python3-certbot python3-certbot-dns-linode python3-certbot-nginx
```

From this point I recommend following [this](https://youtu.be/ATenAnk8eX4?si=vHhu8tO2M5jbBp-l&t=137) guide by Wolfgang. His tutorial runs
you through creating a deploy user, configuring nginx, and creating the GitHub
action to deploy your changes to your server. The only thing you will want to
do different than his tutorial is to run our certs.sh script to install the SSL
certificates instead of the command he provides. You can do this by navigation
to the home directory and running the following:

```bash
./certs.sh
```
