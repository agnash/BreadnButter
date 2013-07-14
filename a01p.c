// do not change this code except in the following ways:
//   * write code for the following functions:
//      * bigOrSmallEndian()
//      * getNextHexInt()
//      * printNumberData()
//   * change studentName by changing "I. Forgot" to your actual name

#include <stdio.h>
#include <stdlib.h>

static char *studentName = "Aaron Nash";
typedef unsigned char *byte_pointer;

// report whether machine is big or small endian
void bigOrSmallEndian()
{
    int test = 0x00001234;
    if (*(byte_pointer) &test == 0x34)
        printf("byte order: little-endian");
    else
        printf("byte order: big-endian");
    printf("\n\n");
}

// get next int (entered in hex) using scanf()
// returns 1 (success) or 0 (failure)
// if call succeeded, return int value via i pointer
int getNextHexInt(int *i)
{
    // replace this code with the call to scanf()
    scanf("%x", i);
    if (*i == 0)
        return 1;
    return *i;
}

// print requested data for the given number
void printNumberData(int i)
{
    int signBit = i;
    int expBits = i;
    int fractBits = i;
    int E;
    signBit >>= 31;
    signBit = 0x1 & signBit;
    printf("signBit %d, ", signBit);
    expBits >>= 23;
    expBits = 0x000000ff & expBits;
    printf("expBits %3d, ", expBits);
    fractBits = 0x007fffff & fractBits;
    printf("fractBits 0x%08X", fractBits);
    printf("\n");
    if (expBits != 0 && expBits != 255)
    {
        E = expBits - 127;
        printf("%-14s", "normalized:");
        printf("exp = %4d", E);
    } else if (expBits == 0)
    {
        if (fractBits == 0)
        {
            if (signBit == 1)
                printf("-zero");
            else
                printf("+zero");
        } else
        {
            E = 1 - 127;
            printf("%-14s", "denormalized:");
            printf("exp = %4d", E);
        }
    } else if (expBits == 255)
    {
        if (fractBits == 0)
        {
            if (signBit == 1)
                printf("-infinity");
            else
                printf("+infinity");
        } else
        {
            fractBits >>= 22;
            fractBits = 0x00000001 & fractBits;
            if (fractBits == 1)
                printf("QNaN");
            else
                printf("SNaN");
        }
    }
    printf("\n\n");
}

// do not change this function in any way
int main(int argc, char **argv)
{
    int     i;                              // number currently being analyzed
    int     nValues;                        // number of values successfully parsed by scanf

    printf("CS201 - A01p - %s\n\n", studentName);
    bigOrSmallEndian();
    for (;;) {
        if (argc == 1)                      // allow grading script to control ...
            printf("> ");                   // ... whether prompt character is printed
        nValues = getNextHexInt(&i);
        printf("0x%08X\n", i);
        if (! nValues) {                    // encountered bad input
            printf("bad input\n");
            while (getchar() != '\n') ;     // flush bad line from input buffer
            continue;
            }
        printNumberData(i);
        if (i == 0)
            break;
        }
    printf("\n");
    return 0;
}