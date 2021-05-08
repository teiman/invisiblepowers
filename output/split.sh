#!/bin/bash

# Extract tiles from image
magick out.png -crop 48x48 +repage out%02d.png

# Resize x2 into img file 
convert out00.png -filter Point -resize x96 +antialias ../img/bblank.png
convert out01.png -filter Point -resize x96 +antialias ../img/busa.png
convert out02.png -filter Point -resize x96 +antialias ../img/bpc.png
convert out03.png -filter Point -resize x96 +antialias ../img/bpope.png
convert out04.png -filter Point -resize x96 +antialias ../img/bcpu.png

# Remove temporal files 
rm out00.png
rm out01.png
rm out02.png
rm out03.png
rm out04.png