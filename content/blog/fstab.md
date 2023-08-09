+++
title = "An (Actually) Easy Guide to Editing the Fstab file"
date = "2023-08-07"
[taxonomies]
categories=["blog","linux"]
tags=["linux","configuration"]
+++
The fstab file contains the drives that will be mounted at boot time.
It contains 6 columns of information that can be divided with tabs or spaces.
- Column 1: Device: You can use the UUID (Reccomended) or device path (UUID=*UUID* or `/dev/*device name*`)
- Column 2: Mount Point: Directory you want the drive to be mounted in. This can be a path to anywhere on the system.
- Column 3: File System: Put the partitions file system, ***auto*** is valid if unknown
- Column 4: Options: Allows to change the behavior of the mounted drive. ***defaults*** is a valid option
- Column 5: Backup Operation (Dump): An outdated backup mechanism and should not be used. Use ***0*** in this column.
- Column 6: File System Check Order: The root file system should be set to ***1***, enter ***0*** for it not to be checked, enter ***2*** for all other file systems. Generally use ***0***.

Steps for adding a device:
1. ```sudo blkid``` to get UUID and filesystem
2. Use ```sudo vi /etc/fstab``` and enter the new line for your device. (Use `sudo nano /etc/fstab` if you are not familiar with vi keybinds)
3. Run ```sudo findmnt --verify``` to ensure your fstab entry is correct.
4. Run ```sudo systemctl daemon-reload``` to update systemd.
5. Run ```sudo mount -a``` to mount all newly added entries.
