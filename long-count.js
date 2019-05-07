//Supplies today's date to the program
function todaysDate() {
    let d = new Date();
    document.getElementById("year").value = d.getFullYear();
    document.getElementById("month").value = d.getMonth() + 1;
    document.getElementById("day").value = d.getDate();
}

//Supplies the day Cuauhtémoc surrendered to Cortes
function cortesDay() {
    document.getElementById("year").value = 1521;
    document.getElementById("month").value = 8;
    document.getElementById("day").value = 23;
}

//Checking to make sure the user inputed a correct date value
function errorCheck() {
    let = daysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let year = Number(document.getElementById("year").value);
    let month = Number(document.getElementById("month").value);
    let day = Number(document.getElementById("day").value);
    let bcBox = document.getElementById("bc");

    console.clear();
    //Checks to see if the year is a leap year and adds a day to Feb if it is
    //Leap years have some odd rules...
    if (((year % 4) === 0) && ((year % 100) !== 0)) {
        daysInAMonth[1] = 29;
    } else if ((year % 400) === 0) {
        daysInAMonth[1] = 29;
    } else if (year === 1 && bcBox.checked === true) {
        daysInAMonth[1] = 29;
    }

    //Makes sure the inputed values are within the proper range
    if (month > 12 || month < 1) {
        document.getElementById("totalDays").innerHTML = "You have entered an invalid month.";
    } else if (day > daysInAMonth[month - 1]) {
        document.getElementById("totalDays").innerHTML = "You have entered an invalid day.";
    } else if (year === 0) {
        document.getElementById("totalDays").innerHTML = "You have entered an invalid year.";
    } else {
        return getDayOfYear(year, month, day, daysInAMonth, bcBox);
    }
}

//Calculates the number of days since Jan 1
function getDayOfYear(year, month, day, daysInAMonth, bcBox) {

    let totalDays = 0;
    //adds up the days of the year in the previous months
    for (i = 0; i < (month - 1); i++) {
        totalDays += daysInAMonth[i];
    }
    //adds the days that have elapsed this month
    totalDays += day;
    console.log(totalDays);
    return daysSinceWorldBegan(year, totalDays, bcBox);
}

//Calculates the days since the world began
function daysSinceWorldBegan(year, totalDays, bcBox) {
    let longCount = 0;
    let longFoundationDay = 223;
    let firstYear = 365 - longFoundationDay;
    let longBCE = 1137142;

    switch(bcBox.checked) {
        //This case checks the Long Count of days if the year is BCE
        case true:
            if (year === 3114) {
                longCount = totalDays - longFoundationDay;
            } else if (year === 3113) {
                longCount = totalDays + firstYear;
            } else {
                for (let i = year + 1; i < 3114; i++) {
                    //Checks to see if the year is a leap year and adds 366 to the count if so
                    if (((i % 4) === 0) && ((i % 100) !== 0)) {
                        longCount += 366;
                    } else if ((i % 400) === 0) {
                        longCount += 366;
                    } else if (i === 1 && bcBox.checked === true) {
                        longCount += 366;
                    } else {
                        longCount += 365;
                    }

                }
                longCount += totalDays + firstYear;
            }
            break;
        //This case checks the Long Count of days if the year is CE
        case false:
            if (year === 1) {
                longCount = totalDays + longBCE;
            } else {
                for (let i = 1; i < year; i++) {
                    //Checks to see if the year is a leap year and adds 366 to the count if so
                    if (((i % 4) === 0) && ((i % 100) !== 0)) {
                        longCount += 366;
                    } else if ((i % 400) === 0) {
                        longCount += 366;
                    } else {
                        longCount += 365;
                    }
                }
                longCount += totalDays + longBCE;
            }
            break;
    }
    document.getElementById("totalDays").innerHTML = longCount + " days since August 11, 3114 BCE";
    console.log(longCount);
    convertToLongCountStyle(longCount);
    return longCount;
}

//Converts the days since the world began into the Mesoamerican number system
function convertToLongCountStyle(longCount) {
    let countHolder = longCount;

    let baktun = Math.floor(countHolder / 144000);
    let baktunCanvas = document.getElementById("baktun");
    let baktunBars = Math.floor(baktun / 5);
    let baktunDots = baktun - (baktunBars * 5);
    drawMayanNumerals(baktunBars, baktunDots, baktunCanvas);

    countHolder -= baktun * 144000;

    let katun = Math.floor(countHolder / 7200);
    let katunCanvas = document.getElementById("katun");
    let katunBars = Math.floor(katun / 5);
    let katunDots = katun - (katunBars * 5);
    drawMayanNumerals(katunBars, katunDots, katunCanvas);

    countHolder -= katun * 7200;

    let tun = Math.floor(countHolder / 360);
    let tunCanvas = document.getElementById("tun");
    let tunBars = Math.floor(tun / 5);
    let tunDots = tun - (tunBars * 5);
    drawMayanNumerals(tunBars, tunDots, tunCanvas);

    countHolder -= tun * 360;

    let uinal = Math.floor(countHolder / 20);
    let uinalCanvas = document.getElementById("uinal");
    let uinalBars = Math.floor(uinal / 5);
    let uinalDots = uinal - (uinalBars * 5);
    drawMayanNumerals(uinalBars, uinalDots, uinalCanvas);

    countHolder -= uinal * 20;

    let kin = countHolder;
    let kinCanvas = document.getElementById("kin");
    let kinBars = Math.floor(kin / 5);
    let kinDots = kin - (kinBars * 5);
    drawMayanNumerals(kinBars, kinDots, kinCanvas);

    console.log(baktun + "." + katun + "." + tun + "." + uinal + "." + kin);
    document.getElementById("longCount").innerHTML = baktun + "." + katun + "." + tun + "." + uinal + "." + kin;
    document.getElementById("tzolkin").innerHTML = "Tzolk'in (Mayan sacred calendar, 260 days): " + calculateTzolkin(longCount);
    document.getElementById("haab").innerHTML = "Haab' (Mayan solar calendar, 365 days): " + calculateHaab(longCount);
    document.getElementById("xiuhnelpilli").innerHTML = "Xiuhnelpilli (Aztec year): " + calculateXiuhnelpilli(Number(document.getElementById("year").value));
    document.getElementById("tonalpohualli").innerHTML = "Tonalpohualli (Aztec sacred calendar, 260 days): " + calculateTonalpohualli(longCount);
    document.getElementById("xiuhpohualli").innerHTML = "Xiuhpohualli (Aztec solar calendar, 365 days): " + calculateXiuhpohualli(longCount);

    function calculateTzolkin(longCount) {
        let tzolkinDays = ["Imix'", "Ik'", "Ak'b'al", "K'an", "Chikchan", "Kimi", "Manik'", "Lamat", "Muluk", "Ok",
                            "Chuwen", "Eb'", "B'en", "Ix", "Men", "Kib'", "Kab'an", "Etz'nab'", "Kawak", "Ajaw"];
        let tzolkinDay = 0;
        let tzolkinCycle = 0;

        tzolkinDay = (4 + longCount) % 13;
        if (tzolkinDay === 0) {
            tzolkinDay = 13;
        }
        tzolkinCycle = longCount % 20;
        if (tzolkinCycle === 0) {
            tzolkinCycle = 20;
        }
        tzolkinCycle--;
        let tzolkinString = tzolkinDay.toString() + " " + tzolkinDays[tzolkinCycle];
        return tzolkinString;
    }

    function calculateHaab(longCount) {
        let haabMonths = ["Pop", "Wo'", "Sip", "Sotz'", "Sek", "Xul", "Yaxk'in'", "Mol", "Ch'en",
                        "Yax", "Sak'", "Keh", "Mak", "K'ank'in", "Muwan'", "Pax", "K'ayab", "Kumk'u", "Wayeb'"];
        let haabDay = 0;
        let haabRoughDay = 0;

        haabRoughDay = (longCount - 17) % 365;

        if (haabRoughDay === 0) {
            haabMonth = 18;
        } else if (haabRoughDay >= 361) {
            haabDay -= 361;
            haabMonth = 18;
        } else {
            haabDay = (haabRoughDay % 20);
            haabMonth = Math.floor(haabRoughDay / 20);
        }


        let haabDayString;
        if (haabDay === 0) {
            haabDayString = "Seating of";
        } else {
            haabDayString = haabDay.toString();
        }

        let haabString = haabDayString + " " + haabMonths[haabMonth];
        return haabString;
    }

    function calculateXiuhnelpilli(year) {
        let yearNames = ["Tecpatl (Flint/Kife)", "Calli (House)", "Tochtli (Rabbit)", "Acatl (Reed)"];

        let yearName = year % 4;

        let yearNumber = year % 13;
        if (yearNumber > 10) {
            yearNumber = yearNumber % 10;
        } else {
            yearNumber += 3;
        }

        let xiuhnelpilliString = yearNumber.toString() + " " + yearNames[yearName];
        return xiuhnelpilliString;
    }

    function calculateTonalpohualli(longCount) {
        let aztecDayNames = ["Cipactli (Caiman)", "Ehecatl (Wind)", "Calli (House)", "Cuetzpalin (Lizard)", "Coatl (Serpent)",
                             "Miquiztli (Death)", "Mazatl (Deer)", "Tochtli (Rabbit)", "Atl (Water)", "Itzcuintli (Dog)",
                             "Ozomahtli (Monkey)", "Malinali (Grass)", "Acatl (Reed)", "Ocelotl (Ocelot)", "Cuauhtli (Eagle)",
                             "Cozcacuahtli (Vulture)", "Olin (Movement)", "Tecpatl (Flint Knife)", "Quiyahuitli (Rain)", "Xochitl (Flower)"];

        let aztecCount = longCount + 160;

        /*if (aztecCount < 0) {
            aztecCount += 260;
            aztecCount = Math.abs(aztecCount);
        }*/

        console.log("aztecCount: " + aztecCount);
        let aztecDay = 0;
        let aztecMonth = 0;

        aztecDay = aztecCount % 13;
        if (aztecDay === 0) {
            aztecDay = 13;
        }

        aztecMonth = aztecCount % 20;
        if (aztecMonth === 0) {
            aztecMonth = 20;
        }


        let tonalpohualliString = aztecDay.toString() + " " + aztecDayNames[aztecMonth - 1];
        return tonalpohualliString;
    }

    function calculateXiuhpohualli(longCount) {
        let aztecMonthNames = ["Atlcahualo", "Tlacaxipehualiztli", "Tozoztontli", "Huey Tozoztli", "Toxcatl",
                               "Etzalcualiztli", "Tecuilhuitontli", "Huey Tecuilhuitl", "Tlaxochimaco", "Xocotl Huetzi",
                                "Ochpaniztli", "Teotleco", "Tepeihuitl", "Quecholli", "Panquetzaliztli",
                                 "Atemoztli", "Tititl", "Izcalli", "Nemontemi"];

        let aztecDay = 0;
        let aztecRoughDay = 0;
        let aztecMonth = 0;

        aztecRoughDay = (longCount - 223) % 365;


        if (aztecRoughDay === 0) {
            aztecDay = 5;
            aztecMonth = 18;
        } else if (aztecRoughDay >= 361) {
            aztecDay = aztecRoughDay - 360;
            aztecMonth = 18;
        } else {
            aztecDay = (aztecRoughDay % 20);
            aztecMonth = Math.floor(aztecRoughDay / 20);
            if (aztecDay === 0) {
                aztecDay = 20;
                aztecMonth--;
            }
        }

        console.log("aztecDay: " + aztecDay);
        console.log(aztecMonthNames[aztecMonth]);

        let xiuhpohualliString = aztecDay.toString() + " " + aztecMonthNames[aztecMonth];
        return xiuhpohualliString;



    }

    function drawMayanNumerals(bars, dots, canvas) {
        let context = canvas.getContext("2d");

        context.clearRect(0, 0, 100, 100);

        if (bars === 0 && dots === 0) {
            context.save();
            context.scale(1, 0.5);
            context.beginPath();
            context.arc(50, 50, 45, 0, Math.PI*2, false);
            context.lineWidth="5";
            context.stroke();
            //context.fillStyle = "black";
            //context.fill();
            context.restore();
        }

        switch(bars) {
            case 1:
              context.beginPath();
              context.rect(0, 36, 100, 20);
              context.fillStyle = "black";
              context.fill();
              break;
            case 2:
                context.beginPath();
                context.fillRect(0, 58, 100, 20);
                context.fillStyle = "black";
                context.fill();

                context.beginPath();
                context.rect(0, 36, 100, 20);
                context.fillStyle = "black";
                context.fill();
                break;
            case 3:
                context.beginPath();
                context.fillRect(0, 80, 100, 20);
                context.fillStyle = "black";
                context.fill();

                context.beginPath();
                context.fillRect(0, 58, 100, 20);
                context.fillStyle = "black";
                context.fill();

                context.beginPath();
                context.rect(0, 36, 100, 20);
                context.fillStyle = "black";
                context.fill();
                break;
        }

        switch(dots) {
            case 1:
                context.beginPath();
                context.arc(50, 17, 11, 0, 2 * Math.PI)
                context.fillStyle = "black";
                context.fill();
                break;
            case 2:
                context.beginPath();
                context.arc(37, 17, 11, 0, 2 * Math.PI)
                context.fillStyle = "black";
                context.fill();

                context.beginPath();
                context.arc(63, 17, 11, 0, 2 * Math.PI)
                context.fillStyle = "black";
                context.fill();

                break;
            case 3:
                context.beginPath();
                context.arc(25, 17, 11, 0, 2 * Math.PI)
                context.fillStyle = "black";
                context.fill();

                context.beginPath();
                context.arc(50, 17, 11, 0, 2 * Math.PI)
                context.fillStyle = "black";
                context.fill();

                context.beginPath();
                context.arc(75, 17, 11, 0, 2 * Math.PI)
                context.fillStyle = "black";
                context.fill();

                break;
            case 4:
                context.beginPath();
                context.arc(11, 17, 11, 0, 2 * Math.PI)
                context.fillStyle = "black";
                context.fill();

                context.beginPath();
                context.arc(37, 17, 11, 0, 2 * Math.PI)
                context.fillStyle = "black";
                context.fill();

                context.beginPath();
                context.arc(63, 17, 11, 0, 2 * Math.PI)
                context.fillStyle = "black";
                context.fill();

                context.beginPath();
                context.arc(89, 17, 11, 0, 2 * Math.PI)
                context.fillStyle = "black";
                context.fill();
                break;
        }
    }
}

function makeAztecCalendar() {
    let aztecDayNames = ["Cipactli", "Ehecatl", "Calli", "Cuetzpalin", "Coatl",
                             "Miquiztli", "Mazatl", "Tochtli", "Atl", "Itzcuintli",
                             "Ozomahtli", "Malinali", "Acatl", "Ocelotl", "Cuauhtli",
                             "Cozcacuahtli", "Olin", "Tecpatl", "Quiyahuitli", "Xochitl"];

    let longCount = errorCheck();

    document.getElementById("calendarBox").innerHTML = "";
    let calendarBox = document.getElementById("calendarBox");
    let calendarTable = document.createElement("table");

    calendarTable.id = "calendarTable";


    let sacred = crunchSacredDay(longCount);
    console.log(sacred[0]);
    console.log(aztecDayNames[sacred[1] -1]);

    for (let i = 0; i < 20; i++) {
        let calendarRow = document.createElement("tr");
        for  (let j = 1; j < 14; j++) {
            let sacredDay = crunchSacredDay(longCount);
            let tableData = document.createElement("td");
            let cellContent = document.createTextNode(sacredDay[0] + " " + aztecDayNames[sacredDay[1] - 1]);
            tableData.appendChild(cellContent);
            calendarRow.appendChild(tableData);
            longCount++
        }
        calendarTable.appendChild(calendarRow);
    }

    calendarBox.appendChild(calendarTable);

    function crunchSacredDay(longCount) {
        let aztecCount = longCount + 160;

        let aztecDay = aztecCount % 13;
        if (aztecDay === 0) {
            aztecDay = 13;
        }

        let aztecMonth = aztecCount % 20;
        if (aztecMonth === 0) {
            aztecMonth = 20;
        }

        return [aztecDay, aztecMonth];

    }
}
