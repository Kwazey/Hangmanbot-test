#include <iostream>
#include <cctype>
#include <vector>
#include <algorithm>
#include <iterator>
using namespace std;

bool debug = false;
vector<char> Word_v;   //The vector containing all the characters
vector<char> Word_v_d; //The vector showed to the participants
vector<char> Guessed;
char Ltr;
int pos ;
int stage = 0;
int attmpt = 10;


void Intro()
{
	string Word;
	cout << "Select your word!\n";
	cin >> Word;
	cout << flush;
	vector<char> temp(Word.begin(), Word.end());
	Word_v = temp;
	Word_v_d = temp;

	for_each(Word_v_d.begin(), Word_v_d.end(),
		[&](char& C)
		{
			auto it = Word_v_d.begin() + pos;
			Word_v_d[pos] = '-';
			pos++;
		});

	stage = 1;

/*	for(char C : Word_v_d)
		cout << C;
*/
}
bool Already_guessed(char g)
{
	pos = 0;
	int res = 0;
	for_each(Guessed.begin(), Guessed.end(),
		[&](char& C)
		{
			if (debug)
			{
				cout << endl << "This is Already guessed vector size: " << Guessed.size() << endl;
				cout << "Position is : " << pos << endl;
			}
			if (C == g)
				res = 1;

			pos++;
		});

	if (res == 1)
		return true;

		return false;
}
bool Control()
{
	cin >> Ltr;
	if (isalpha(Ltr))
		if (!Already_guessed(Ltr))
			return true;

		else
			cout << "You can't guess a letter you have guessed before! \n";
	else
	cout << "You have to guess a letter!\n";

	return false;
}
void Guess()
{
	if (attmpt == 1)
		cout << "One guess left!\n";

	cout << endl << "Guess a letter!: " << endl;
	while (!Control());
	cout << "You guessed: " << Ltr;
	Guessed.push_back(Ltr);
	attmpt--;
	if (attmpt == 0)
		stage = 2;
}
void Check_if_correct()
{
	pos = 0;
	for_each(Word_v.begin(), Word_v.end(),
		[&](char& C)
		{
			if (debug)
			{
				cout << endl << "This is visible vector size: " << Word_v_d.size() << endl;
				cout << "Position is : " << pos << endl;
			}

			if (C == Ltr)
				Word_v_d[pos] = Ltr;

			pos++;
		});
}
void Print()
{
	cout << endl << "Printing board...\n";
	for (char C : Word_v_d)
		cout << C;
}
void Check_done()
{
	if (Word_v == Word_v_d)
		stage = 3;
}
void Fail()
{
	cout << endl << "You bad. The word was: ";
		for (char C : Word_v)
			cout << C;
}
void Win() 
{
	cout << endl << "You guessed the word corectly! Congratulations!";
}

int main()
{
	while(stage != 4)
	{
		switch (stage)
		{
		case 0:
			Intro();
			break;
		case 1:
			Guess();
			Check_if_correct();
			Print();
			Check_done();
			break;

		case 2:
			Fail();
			stage = 4;
			break;

		case 3:
			Win();
			stage = 4;
			break;
		}
	}
}