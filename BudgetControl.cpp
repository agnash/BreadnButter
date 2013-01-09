/*	This is the Lab 1 program (BudgetControl.cpp). This program acts like an
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

// function prototypes
void loadDefaults();
double addToCart(int index, int option);

int main() {
	char reply, quit;			// actually using quit?
	bool shopping = true;
	int itemCounter = 0;
	/* not sure if this goes here yet \/	*/
	cout.setf(ios::fixed, ios::floatfield);
	cout.setf(ios::showpoint);
	cout.precision(2);
	/*								  /\	*/
	loadDefaults();
	cout << "Welcome to Aaron's Shopping Cart Budget Controller!\n" << endl;
	do {
		cout << "These are items that you can add to your cart:\n" << endl;
		cout << setfill('.');
		cout << "\t1. " << left << setw(30) << defaultItems[0] << right << setw(10) << "$5.00" << endl;
		cout << "\t2. " << left << setw(30) << defaultItems[1] << right << setw(10) << "$1.00" << endl;
		cout << "\t3. " << left << setw(30) << defaultItems[2] << right << setw(10) << "$0.50" << endl;
		cout << "\t4. " << left << setw(30) << defaultItems[3] << right << setw(10) << "$399.00" << endl;
		cout << "\t5. " << left << setw(30) << defaultItems[4] << right << setw(10) << "$9.99" << endl;
		cout << "\t6. Enter a different item\n" << endl;
		cout << "Select an item to add to your cart (enter a number to go shopping, enter 'q' to stop shopping): "; // remove '\n' after adding cin.get
		cin.get(reply);
		cout << endl;
		switch (reply) {
			case '1' :
				// add Toy penguin to list
				addToCart(itemCounter, 0);
				break;
			case '2' :
				// add Old sock to list
				addToCart(itemCounter, 1);
				break;
			case '3' :
				// add Breath mint to list
				addToCart(itemCounter, 2);
				break;
			case '4' :
				// add Television to list
				addToCart(itemCounter, 3);
				break;
			case '5' :
				// add Music CD to list
				addToCart(itemCounter, 4);
				break;
			case '6' :
				// add a custom item to the list
				addToCart(itemCounter, 5);
				break;
			case 'q' :
				shopping = false;
				break;
			default :
				// disallow illegal inputs
				cout << "That is not a valid selection. Please try again.\n" << endl;
				break;
		}
		itemCounter++;
	} while (shopping);
	cin.ignore(100, '\n');
	
			


	// end prompt
	cout << "Select any letter followed by <Enter> to quit: ";
	cin.get(quit);
	return 0;
}

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

double addToCart(int index, int option) {
	double unitPrice, runningTotal = 0;
	char newDescription[31];
	int unitQuantity;
	cin.ignore(100, '\n');
	if (option == 5) {
		cout << "\tEnter a product description: ";
		cin.get(items[index].description, MAX_DESCRIPTION, '\n');
		cin.ignore(100, '\n');
		cout << "\tEnter the price per unit (do not include '$'): ";
		cin >> items[index].price;
		while (!cin) {
			cin.clear();
			cin.ignore(100, '\n');
			cout << "\tInvalid entry. Please enter the price again (do not include '$'): ";
			cin >> items[index].price;
		}
		cin.ignore(100, '\n');
		cout << "\tEnter the number of units you will buy: ";
		cin >> items[index].units;
		while (!cin) {
			cin.clear();
			cin.ignore(100, '\n');
			cout << "\tInvalid entry. Please enter the quantity again: ";
			cin >> items[index].units;
		}
		cin.ignore(100, '\n');
		// still need to echo input, total, and [record] grand total
	} else {
		strcpy(items[index].description, defaultItems[option]);
		items[index].price = defaultPrices[option];
		cout << "\tAt $" << defaultPrices[option] << " per unit, enter the number of " << defaultItems[option] << "s you would like to buy: ";
		cin >> items[index].units;
		while (!cin) {
			cin.clear();
			cin.ignore(100, '\n');
			cout << "\tInvalid entry. Please enter the quantity again: ";
			cin >> items[index].units;
		}
		cin.ignore(100, '\n');
		// still need to echo input, total, and [record] grand total
	}
	return runningTotal;
}
	