# Mr. Roboger's Neighborhood
#### Special Project #3 for Epicodus, 20 January 2023
### by Mike Donovan

[Visit at GitHub Pages](https://eggborne.github.io/roboger)

## Description

A website that produces a whimsical yet logical output based on a number submitted by the user.

## Technologies Used:
* HTML
* CSS
* JavaScript

## Setup/Installation Instructions

Open a terminal and clone this repository by typing:

> git clone https://github.com/eggborne/roboger

Navigate to the cloned directory and open index.html in your favorite web browser.

### Tests

> Describe: getNumberArray()

```
Test: "It should return an array of numbers from 0 to the user's inputted number"
Code: getNumberArray(5);
Expected Output: [0, 1, 2, 3, 4, 5]

Test: "It should work as expected with negative numbers"
Code: getNumberArray(-5);
Expected Output: [0, -1, -2, -3, -4, -5]
```


> Describe: getConvertedNumber()

```
Test: "It should change 1 to "Beep!"
Code: getConvertedNumber(1);
Expected Output: "Beep!"

Test: "It should change 2 to "Boop!"
Code: getConvertedNumber(2);
Expected Output: "Boop!"

Test: "It should change 3 to "Won't you be my neighbor?"
Code: getConvertedNumber(3);
Expected Output: "Won't you be my neighbor?"

Test: "It should change a multi-digit number containing a 3 to "Won't you be my neighbor?" even if it also contains a 1 and a 2
Code: getConvertedNumber(123);
Expected Output: "Won't you be my neighbor?"

Test: "It should change a multi-digit number containing a 2 to "Boop!" even if it also contains a 1
Code: getConvertedNumber(124);
Expected Output: "Boop!"

Test: "It should change a multi-digit number containing a 1 (and no 2s or 3s) to "Beep!"
Code: getConvertedNumber(145);
Expected Output: "Beep!"
```


> Describe: getConvertedArray()

```
Test: "It should change [0,1,2,3,4,5] to [0, "Beep!", "Boop!", "Won't you be my neighbor?", 4, 5]
Code: getConvertedArray([0,1,2,3,4,5]);
Expected Output: [0, "Beep!", "Boop!", "Won't you be my neighbor?", 4, 5]

Test: "It should change [0, -1, -2, -3, -4, -5] to [0, "Beep!", "Boop!", "Won't you be my neighbor?", -4, -5]
Code: getConvertedArray([0,-1,-2,-3,-4,-5]);
Expected Output: [0, "Beep!", "Boop!", "Won't you be my neighbor?", 4, 5]

Test: "It should change [0,1,2,3,4,5,6,7,8,9,10,11,12,13] to [0, "Beep!", "Boop!", "Won't you be my neighbor?", 4, 5, 6, 7, 8, 9, "Beep!", "Beep!", "Boop!", "Won't you be my neighbor?"]
Code: getConvertedArray([0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
Expected Output: [0, "Beep!", "Boop!", "Won't you be my neighbor?", 4, 5, 6, 7, 8, 9, "Beep!", "Beep!", "Boop!", "Won't you be my neighbor?"]
```

## Legal

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

