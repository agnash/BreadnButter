#!/bin/bash
clear
cat ~/324260/stocks.txt > /dev/null 2> /dev/null
if [ "$?" = 1 ] 
then
	touch ~/324260/stocks.txt
	echo "File did not exist so it was created."
fi
more ~/324260/stocks.txt
echo -ne "\nPress any key to continue: "
read -n1
clear
