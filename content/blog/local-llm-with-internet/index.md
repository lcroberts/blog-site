+++
title = 'Running Local LLMs With Internet Access Using Docker Compose'
author = "Logan Roberts"
date = 2024-11-03T00:00:00-05:00
categories = ["Tutorial"]
tags = ["LLM", "Docker"]
keywords = ["AI", "Artificial Intelligence", "Docker", "Docker Compose", "Ollama", "Open WebUI", "LLM", "Local LLM"]
+++

I believe that LLMs have the potential to be incredibly useful, however the
lack of privacy in online services is a major concern to me. Anything put into
any service online will be put back into training in an attempt to make the
service as good as possible. This can, and has, led to instances of information
that should be private leaking. One such example of this is [AI coding
assistants outputing API
keys](https://www.theregister.com/2023/09/19/github_copilot_amazon_api/). An
easy way around privacy concerns is to run the LLM locally. If you haven't
taken a look into doing this it might seem a bit challenging, but a lot of work
has been put into making this fairly easy. We'll use docker compose and
existing tools to set up a locally running LLM that is even able to access web
results to inform it's answers.

[Ollama](https://github.com/ollama/ollama) lets you quickly and easily run a
large amount of large language models. The list of supported models includes
ones such as Llama from Meta, and Phi from Microsoft. However this project
mainly just provides a webserver with an API and doesn't provide a user
friendly way of using it. This is where [Open
WebUI](https://github.com/open-webui/open-webui) comes in. It provides
integrations with OpenAI and Ollama, all while being incredibly easy to set up.
While it has images bundled with Ollama we will not be using them since I have
an AMD GPU and had issues getting those images to utilize it. If you are only
planning on using CPU or are using an Nvidia GPU those images might be worth
investigating. Open WebUI also has many tools built into it as well. This
include retrieval augmented generation (RAG) and integrations with image
generation providers. We will be using it's RAG support to enable the LLM to
base its responses off of web results. We'll do this by using the integration
with [Searxng](https://github.com/searxng/searxng), which aggregates results
from various other search engines in an anonymized way. While you could use
another search engine you might run into issues with rate limiting. We do not
have to worry about this since we'll be running Searxng locally.

> Note: This guide works under the assumption you using Linux. While there are
> versions of Ollama for Windows and MacOS as well GPU access through the
> provided compose file will not work.

Before going any further, you will need to install docker and docker compose.
Instructions for that can be found
[here.](https://docs.docker.com/engine/install/)

Now that you have docker installed make the directory you want the data for
everything to live in and run the following curl commands to get the files used
to set everything up:

```bash
curl -o compose.yml https://lcroberts.dev/blog/local-llm-with-internet/compose.yml
curl -o setup_searxng_config.sh https://lcroberts.dev/blog/local-llm-with-internet/setup_searxng_config.sh && chmod +x ./setup_searxng_config.sh
```

The `compose.yml` file is what it says on the tin, the docker compose file to
get up and running quickly. The other script just sets up Searxng config files
for open webui's web search feature. Details for that can be found
[here.](https://docs.openwebui.com/tutorials/features/web_search/) If you have
an AMD GPU that supports ROCM and are on Linux you'll most likely be able to
run the `setup_searxng_config.sh` script and run `docker compose up -d` to have
everything work. If you want to know more about how everything works or adjust
it so that it works on your system keep reading.

Below is the compose file, let's take a look at the various parts and break
down what they're doing.

{{< code language="yaml" source="/compose.yml" >}}

First is the Ollama service. Since I use and AMD GPU I'm using the ROCM image
and am passing through `/def/kfd` (which is the [AMD Kernel Fusion
Driver](https://en.wikipedia.org/wiki/AMDgpu_(Linux_kernel_module)) device) and
`/dev/dri` (the [Direct Rendering
Infrastructure](https://en.wikipedia.org/wiki/Direct_Rendering_Infrastructure)
device). If you are using your CPU to run Ollama you can remove the devices
section and remove the "rocm" tag from the image. If you are using an Nvidia
card your best bet is to use the Open WebUI cuda image. This will likely
require changing some other things in the compose file. For more details I've
linked some pieces of documentation at the bottom. 

In the volumes section of the ollama service we map a folder called "ollama" in
the directory where the compose file is to the place where the models and
encryption keys are stored in the container. This prevents having to repeatedly
download models if you need to change a configuration of your Ollama instance.

The second service is the Open WebUI service. It has several environment
variables that configure the initial settings for the web search feature. The
top environment variable `OLLAMA_BASE_URL` pointing to the Ollama service. By
default docker compose puts all services inside of the same network. You can
then access the other services in that network using their hostnames. In this
case since the other images hostname is `ollama` we point the environment
variable to `http://ollama:11434`. We do the same thing in the environment
variable `SEARXNG_QUERY_URL` where we reference the `searxng` service. Like in
the ollama service we map the data storage of the container to a directory so
that our data can persist across version updates or reconfigurations of the
compose file. The Open WebUI service is also the only service where we map
ports for outside access. The first port (3000 in the provided compose file) is
the port on your host system, where the second number is the port on the
container. If you want the web interface to run on a different port, just
change 3000 to whatever port you want it to run on.

The final service in the compose file is for Searxng. The only additional
configuration for this container is mapping the configuration directory of
Searxng in the container to a directory in our host filesystem.

After you've made any modifications you need you should be able to run the
`setup_searxng_config.sh` script and `docker compose up -d`. If everything
works as intended in a few minutes you'll have LLMs running locally and be able
to turn on web search to have the LLM respond based on current information.

> Note: You have to turn web search on per chat. This can be done by hitting
> the plus sign at the left side of the text input and toggling it on.

# References And More Detail

- [Ollama](https://github.com/ollama/ollama): General information.
- [Ollama Model Search](https://ollama.com/library): Search through all of the supported models that Ollama can pull and run.
- [Ollama Docker Image Instructions](https://hub.docker.com/r/ollama/ollama): Information about running Ollama with docker.
- [Open WebUI](https://github.com/open-webui/open-webui)
- [Open WebUI Getting Started](https://docs.openwebui.com/getting-started/):
This has more information on running Open WebUI with bundled Ollama instances,
including those for Nvidia GPUs. While it only has docker run commands, those
can be easily adapted into docker compose if you so wish.
- [Open WebUI Web Search
Reference](https://docs.openwebui.com/tutorials/features/web_search/): Information about integrations with other search engines.
- [Compose File Reference](https://docs.docker.com/reference/compose-file/): Helpful when translating docker run commands into a compose file.
