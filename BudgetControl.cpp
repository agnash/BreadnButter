/*	This is the CS 162, Lab 1 program (BudgetControl.cpp). This program acts like an
	in-cart price calculator and tracker for items as you shop for them. Each time the
	program is ready to add a new item, the user will be presented with a small inventory
	of common items and their prices, allowing them to enter only the number of units they
	want. They will also have the option to enter in an item that is not on the list. For 
	each custom item it will ask for a description first, then a unit price, then finally 
	the number of units. The running total cost will be presented after each item is added 
	and when the user is ready to quit, a total receipt-style list will be printed as a 
	summary.
   
	Written by: Aaron Nash

	Date: 09/16/2009

	Sources: Video: Module 1: Read Int
			 Video: Module 1: Read Strings
*/

#include <iostream>
#include <iomanip>
#include <cstring>

using namespace std;

// these constants define the limits of some of the following arrays
const int MAX_ITEMS = 100;
const int MAX_DESCRIPTION = 101;

// this struct will store information about an individual type of item in the shopping cart
struct itemData {
	char description[MAX_DESCRIPTION];
	double price;
	int units;
};

// this array of structs of type itemData will serve as the virtual shopping cart
itemData items[MAX_ITEMS];

// these global arrays will store information about the items in the pre-loaded inventory
char defaultItems[5][31];
double defaultPrices[5];

// function prototypes - see below for more explanation
void loadDefaults();
void addToCart(int index, int option, int& runningItems, double& runningTotal);

int main() {
    // variable declarations
	char reply, quit;
	bool shopping = true;
    int itemCounter = 0;
    int totalItems = 0;
    double grandTotal = 0;
	// for standardizing a suitable monetary format for outputed doubles
	cout.setf(ios::fixed, ios::floatfield);
	cout.setf(ios::showpoint);
	cout.precision(2);
	loadDefaults();         // this initializes the pre-loaded inventory. see below
	cout << "Welcome to Aaron's Shopping Cart Budget Controller!\n" << endl;
    // hence begins the main program loop
	do {                    // i don't want the user to forget the list, so it re-appears on each run-through
		cout << "These are items that you can add to your cart:\n" << endl;
		cout << setfill('.');
		cout << "\t1. " << left << setw(30) << defaultItems[0] << right << setw(10) << "$5.00" << endl;
		cout << "\t2. " << left << setw(30) << defaultItems[1] << right << setw(10) << "$1.00" << endl;
		cout << "\t3. " << left << setw(30) << defaultItems[2] << right << setw(10) << "$0.50" << endl;
		cout << "\t4. " << left << setw(30) << defaultItems[3] << right << setw(10) << "$399.00" << endl;
		cout << "\t5. " << left << setw(30) << defaultItems[4] << right << setw(10) << "$9.99" << endl;
        cout << setfill(' ');
		cout << "\t6. Enter a different item\n" << endl;
		cout << "Select an item to add to your cart (enter a number to go shopping, enter 'q' to stop shopping): "; // remove '\n' after adding cin.get
		cin.get(reply);
		cout << endl;
        // menu selection logic
		switch (reply) {
			case '1' :
				// add Toy penguin to shopping cart
				addToCart(itemCounter, 0, totalItems, grandTotal);
                itemCounter++;
				break;
			case '2' :
				// add Old sock to shopping cart
				addToCart(itemCounter, 1, totalItems, grandTotal);
                itemCounter++;
				break;
			case '3' :
				// add Breath mint to shopping cart
				addToCart(itemCounter, 2, totalItems, grandTotal);
                itemCounter++;
				break;
			case '4' :
				// add Television to shopping cart
				addToCart(itemCounter, 3, totalItems, grandTotal);
                itemCounter++;
				break;
			case '5' :
				// add Music CD to shopping cart
				addToCart(itemCounter, 4, totalItems, grandTotal);
                itemCounter++;
				break;
			case '6' :
				// add a custom item to the shopping cart
				addToCart(itemCounter, 5, totalItems, grandTotal);
                itemCounter++;
				break;
			case 'q' :
                // exit the main loop
				shopping = false;
				break;
			default :
				// account for illegal inputs
				cout << "That is not a valid selection. Please try again.\n" << endl;
				break;
		}
	} while (shopping);
	cin.ignore(100, '\n');
    // this section displays the shopping cart summary (bill) but only if there are actually items in the shopping cart 
    if (itemCounter > 0) {
        cout << "You purchased " << totalItems << " items in total. Here is your bill:\n" << endl;
        cout << "\t" << left << setw(30) << "ITEM" << setw(8) << "QTY" << "LINE-PRICE" << endl;
	    for (int i = 0; i < itemCounter; i++) {
            cout << "\t" << setfill('.') << left << setw(30) << items[i].description << setw(8) << items[i].units 
                 << setfill(' ') << "$" << right << setw(9) << items[i].units * items[i].price << endl;            
	    }
        cout << "\t" << setfill('.') << left << setw(38) << "GRAND TOTAL" << setfill(' ') 
             << "$" << right << setw(9) << grandTotal << endl;
        cout << endl << "Thank you for shopping!\n" << endl;
    }
	// end prompt
	cout << "Select any letter followed by <Enter> to quit: ";
	cin.get(quit);
	return 0;
}

/*  this function is responsible for setting up the pre-loaded inventory. item
    descriptions are stored in a two-dimensional character array and the
    corresponding prices get their own array.
*/
void loadDefaults() {
	strcpy(defaultItems[0], "Toy penguin");
	strcpy(defaultItems[1], "Old sock");
	strcpy(defaultItems[2], "Breath mint");
	strcpy(defaultItems[3], "Television");
	strcpy(defaultItems[4], "Music CD");
	defaultPrices[0] = 5.00;
	defaultPrices[1] = 1.00;
	defaultPrices[2] = 0.50;
	defaultPrices[3] = 399.00;
	defaultPrices[4] = 9.99;
	return;
}

/*  this function is responsible for collecting required information about a
    certain item (menu selection) and then adding it the shopping cart (the
    array of structs called 'items'). it takes/returns the running totals of
    items in the cart and the price of items in the cart as reference
    parameters. Items are entered directly into the appropriate struct from 
    either the standard input or one of the two default arrays.
*/
void addToCart(int index, int option, int& runningItems, double& runningTotal) {
    char newDescription[31];
	cin.ignore(100, '\n');
	if (option == 5) {      // the following executes if the item is custom
		cout << "\tEnter a product description: ";
		cin.get(items[index].description, MAX_DESCRIPTION, '\n');
		cin.ignore(100, '\n');
		cout << "\tEnter the price per unit (do not include '$'): ";
		cin >> items[index].price;
		while (!cin) {      // check for bad input
			cin.clear();
			cin.ignore(100, '\n');
			cout << "\tInvalid entry. Please enter the price again (do not include '$'): ";
			cin >> items[index].price;
		}
		cin.ignore(100, '\n');
		cout << "\tEnter the number of units you will buy: ";
		cin >> items[index].units;
		while (!cin) {      // check for bad input
			cin.clear();
			cin.ignore(100, '\n');
			cout << "\tInvalid entry. Please enter the quantity again: ";
			cin >> items[index].units;
		}
		cin.ignore(100, '\n');
	} else {                // else the following executes if the item is a default one
		strcpy(items[index].description, defaultItems[option]);
		items[index].price = defaultPrices[option];
		cout << "\tAt $" << defaultPrices[option] << " per unit, enter the number of " << defaultItems[option] << "s you would like to buy: ";
		cin >> items[index].units;
		while (!cin) {      // check for bad input
			cin.clear();
			cin.ignore(100, '\n');
			cout << "\tInvalid entry. Please enter the quantity again: ";
			cin >> items[index].units;
		}
		cin.ignore(100, '\n');
	}
    // below provides a repeat to the user of what they just entered and what the current status of the shopping cart is
    cout << endl;
    cout << "\t" << items[index].units << " " << items[index].description <<"(s) have been added to the cart at a cost of $"
         << items[index].units * items[index].price << "." << endl;
    runningItems += items[index].units;
    runningTotal += items[index].units * items[index].price;
    cout << "\t" << "There are now " << runningItems << " total item(s) in the cart. The total bill is up to $" << runningTotal << ".\n" << endl;
	return;
}
	