# long-count
Program to calculate long count dates and other fun stuff
I made this on a whim while learning about the Mayan long count calendar.
After error checking, the first thing it does is calculate the number of days since August 11, 3114 BCE Gregorian. When putting in any date before the 18th century, care needs to be taken that you are entering a Gregorian date and not a Julian date. This is where a lot of Mesoamerican horoscope sites make mistakes. This count of days is the Mayan long count.
Next, the long count is converted into the wacky (it's only wacky at first glance) Mayan number system. The first number can be 0-19, the next is 0-17, the rest are 0-19. In a base-20 system, two digits could represent a value up to 399, with this system two digits can represent up to 359 which closely aproximates the length of the year.
While the digits are being calculated, the numbers are also being drawn within a <canvas> element.
After the numbers have been displayed I go on to calculate the day of the sacred and secular calendar year for both the Mayan and Aztec calendars.
Finally, I have a button to generate a table of the next 260 days in the Aztec sacred calendar. I don't remember why I did this...
