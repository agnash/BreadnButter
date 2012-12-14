// This is a simple program that calculates helpful stock trading scenarios

#include "stdafx.h"
#include <iostream>
#include <iomanip>

using namespace std;

int getShares();
double getBuy();
double getSell();
double getCom();
double getProfit();

int main() {
    bool esc;
    char selection;
    int shares;
    double buy, sell, com, profit, adjProf, gain, fee;
	cout << fixed << setprecision(2);
    cout << "\nWelcome to Aaron's Stock Adviser\n" << endl;
    while (esc == false) {
        cout << "What would you like to calculate?" << endl;
        cout << "\n\t1) Suggested buy price" << endl;
        cout << "\t2) Suggested sell price" << endl;
        cout << "\t3) Suggested share volume" << endl;
        cout << "\t4) Estimated profit" << endl;
        cout << "\t5) SEC fees" << endl;
        cout << "\t6) Reminders" << endl;
        cout << "\t7) Exit" << endl;
        cout << "\nSelect a number to continue: ";
        cin >> selection;
        cout << endl;
        switch (selection) {
            case '1':
                sell = getSell();
                shares = getShares();
                profit = getProfit();
                com = getCom();
                // calcs
                adjProf = profit + 2 * com;
                buy = sell - (adjProf / shares);
                // report
                cout << "\n\tTo earn a profit of $" << profit << " at a sell price of $"
                    << sell << " per share using " << shares << " shares of the stock, you will need to buy the stock at $"
                    << buy << " per share, assuming $" << com << " commissions per trade.\n" << endl;
                break;
            case '2':
                buy = getBuy();
                shares = getShares();
                profit = getProfit();
                com = getCom();
                // calcs
                adjProf = profit + 2 * com;
                sell = (adjProf / shares) + buy;
                // report
                cout << "\n\tTo earn a profit of $" << profit << " at a buy price of $"
                    << buy << " per share using " << shares << " shares of the stock, you will need to sell the stock at $"
                    << sell << " per share, assuming $" << com << " commissions per trade.\n" << endl;
                break;
            case '3':
                buy = getBuy();
                do {
                    sell = getSell();
                    if (sell == buy) {
                        cout << "\tError: Sell price cannot be equal to buy price. Please try again." << endl;
                    }
                }
                while (sell == buy);
                profit = getProfit();
                com = getCom();
                // calcs
                adjProf = profit + 2 * com;
                gain = sell - buy;
                shares = adjProf / gain;
                // report
                cout << "\n\tTo earn a profit of $" << profit << " at a buy price of $" 
                    << buy << " and a sell price of $" << sell << ", you will need to purchase "
                    << shares << " shares of the stock, assuming $" << com << " commissions per trade.\n"
                    << endl;
                break;
            case '4':
                buy = getBuy();
                sell = getSell();
                shares = getShares();
                com = getCom();
                // calcs
                gain = sell - buy;
                profit = (shares * gain) - 2 * com;
                // report
                cout << "\n\tBuying " << shares << " shares of the stock at $" << buy << " per share and selling them for $"
                    << sell << " per share would yield you a profit of $" << profit << ", assuming $" << com
                    << " commissions per trade.\n" << endl;
                break;
            case '5':
                shares = getShares();
                fee = static_cast<double>(shares) * .01;
                cout << "\n\tThe SEC fee is estimated to be $" << fee << " for a single trade and $" << fee * 2 << " for two trades (buy and sell).\n"
                    << endl;
                break;
            case '6':
                cout << "\tEmpty\n" << endl;
                break;
            case '7':
                esc = true;
                break;
            
            default:
                cout << "\tInvalid option. Try again.\n" << endl;
        }
    }
    cout << "Thank you.\n" << endl;
    return 0;
}

int getShares() {
    int shares;
    cout << "\tEnter the share volume (number of shares): ";
    cin >> shares;
    return shares;
}

double getBuy() {
    double buy;
    cout << "\tEnter the target buy price: ";
    cin >> buy;
    return buy;
}

double getSell() {
    double sell;
    cout << "\tEnter the target sell price: ";
    cin >> sell;
    return sell;
}

double getCom() {
    double com;
    cout << "\tEnter the per-trade commission: ";
    cin >> com;
    return com;
}

double getProfit() {
    double profit;
    cout << "\tEnter the desired net-profit: ";
    cin >> profit;
    return profit;
}
