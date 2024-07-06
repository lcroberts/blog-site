+++
title = "An (Actually) Easy Guide to Editing the Fstab file"
author = ["Logan Roberts"]
date = 2023-08-07T00:00:00-04:00
categories = ["Tutorial"]
tags = ["Linux", "Configuration"]
draft = false
+++

The fstab file contains the drives that will be mounted at boot time. It
contains 6 columns of information that can be divided with tabs or spaces.

-   Column 1: Device: You can use the UUID (Recommended) or device path
    (UUID=\*UUID\* or \`/dev/\*device name\*\`)
-   Column 2: Mount Point: Directory you want the drive to be mounted in. This
    can be a path to anywhere on the system.
-   Column 3: File System: Put the partitions file system, **auto** is valid if
    unknown
-   Column 4: Options: Allows to change the behavior of the mounted drive.
    **defaults** is a valid option
-   Column 5: Backup Operation (Dump): An outdated backup mechanism and should
    not be used. Use ******0****** in this column.
-   Column 6: File System Check Order: The root file system should be set to **1**,
    enter **0** for it not to be checked, enter **2** for all other file systems.
    Generally use **0**.

Steps for adding a device:

1.  Run **_lsblk_** to figure out the name assigned to the partition you want to mount
2.  Run **_sudo blkid_** to get UUID and filesystem
3.  Use **_sudo vi /etc/fstab_** and enter the new line for your device. (Use **_sudo nano /etc/fstab_** if you are not familiar with vi keybinds)
4.  Run **_sudo findmnt --verify_** to ensure your fstab entry is correct.
5.  Run **_sudo systemctl daemon-reload_** to update systemd.
6.  Run **_sudo mount -a_** to mount all newly added entries.
