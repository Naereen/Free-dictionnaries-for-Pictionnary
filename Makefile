# Makefile to send this project to Szam
SHELL=/usr/bin/env /bin/bash

all:	send

send:	send_zamok
send_zamok: clean
	CP --exclude=.ipynb_checkpoints --exclude=.git ./ ${Szam}publis/Free-dictionnaries-for-Pictionnary.git

exemple_fr_10:
	cat dictionnaire_pictionnary_francais.txt | shuf | head -n10
