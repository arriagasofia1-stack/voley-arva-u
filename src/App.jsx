import { useState, useEffect } from "react";

const HOY = new Date(); HOY.setHours(0,0,0,0);
const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const SK = "ulp_voley_v4";
const SK_THEME = "ulp_theme_v1";
const ESCUDO = "data:image/png;base64,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";
const ESCUDO_DARK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAASeElEQVR42u1ce1BV1dt+9j5XQBAFFEhAiBQSKEFNEjXvaKk50mXykmWmpMXoWGbmYPxSQ0dTvI2iZhfpMjZdtdGxtAzTHIzRxBK8JTcTVDggnOvz/fOt9Z0jiIBH6dfnmtlzDufsvc56n/W8l/Wud6EAIO62Gzb1LgR3AboL0P8LgBRFafT9XYAAaDQakP/nK0hCq9XeBUiAY7fbERAQgOXLlyMrKwthYWGw2WzQaDT/CDaxLS6NRiPfJyUlcdu2bYyNjWV4eDjfe+89jhs3Tn6v1WqpKEqbjFO503GQVquFoiiwWq0wGAxIS0tDcHAw5s+fj/DwcBgMBvz222/4z3/+A6PRiFWrVqGkpESyyWaz/TsZpKoqVVWVfycnJ/O9997j008/TQB86qmnKNrMmTMJgAMHDuS2bds4depUyThFUVzYdweu26tGOp3OBZjevXtzzZo1XLJkCX18fKgoCjdv3kyS/Oqrr5iTk0OS3LVrF/39/QmAaWlpDdQOAHU63Z0Ay436+r+ze/2gVVXl0KFDuXr1aq5atYrR0dEEwNGjR7OsrIwkmZGRIe9PS0sjSVqtVr788ssEQB8fH7755pvcvHkzJ06cyA4dOjSYDI1GQ0VR3G2vWsaIxi5nhjiDFRMTw9TUVG7atImLFi1iZGQkAbBHjx7cu3cvSfLUqVN85JFHZP9arZYAGBsby9zcXJLkiRMnmJycTAD09vbmzJkzuWXLFqanpzMxMZF6vb7Jybr+agmAbjPS3t7eCAwMRFRUFOLi4hAQEIDa2locPHgQe/bsgdVqRd++fbFw4UKMGjUKAJCRkYHMzExcu3YNWq1WGmDn9zNmzMCSJUvQoUMH5OfnY/HixdixYwcAICkpCYMHD0ZgYCAqKipQUFCAgoICXLhwAVeuXHFPANtcgDw8PJCUlAQPDw/odDrodDp07twZ/v7+0Gg00Ol0MJlMOH/+PI4ePYrjx48DADp37ozx48dj+vTpiIuLAwBs2bIFmZmZKCwshKIo0Gg0DbyTs9fq2LEjUlNTMXfuXPj6+qKiogKbNm3Ctm3bUFhYCAC47777kJCQgLCwMAQEBKC+vh4kUVVVhbKyMtTX18NqtcJsNuPHH39EfX09FEVxCVBb5cWE+sTExDAnJ4fjx4/nsGHD2LdvX95333309/en0WiU97dv356DBg3ismXLeOLECemZ/vrrLy5evFiqmYhvGlNP598WKgeAvr6+nDlzJo8dOyb7LS4uZnZ2NseOHcvAwEAXc+Dn58fIyEj26dOHQ4cO5fjx45mTk8OePXu6yHZLKqaqKhwOB+Lj49G3b1+sX78eU6ZMgY+PD/z9/eHn54fOnTsjMjIS3bp1g4eHh3y2qKgIu3fvxhdffIEDBw7AYrG4LC0cDkez12mqqsJut8vPEhISMG7cOIwcORLx8fHyc6vViqKiIpw6dQqVlZUoLi5GeXk5zGYztm7dimnTpiE/Px9HjhyRst2SiolOHnzwQQwaNAgffvghLl26BAC4fPkyLBYLampqUFpaiqKiIpw5cwZ5eXk4efIkzp8/79KXTqeD3W5vNjCNjUWj0cBqtbp8LmxffHw8oqKiEBkZiS5dusBut6NLly5o164dAKBr164YPXo0fvnlF+Tl5TULoJuuCIWOWq1WWCwW1NfXw2az4ZVXXsGGDRtuqsdarVay5XrBWtocDocUSFVVyary8nKUl5dj//79Lvc/99xzmDNnDrp37w6bzYba2lqoqtqiaLzZS+b6+noYjUa50hazIgYpBixAFaDcrqWBM1jOyxetVosnnngCc+fOdVE9m80Gu90Okqivr3eZfLcAVF1dLVXEbDbDz88PiqLI1bbzgJ1tx/UrcpJQFAUOh8PFptzMBgkmXt+XEB4ARo0ahXnz5mHAgAEAIAHRarWoq6sDABiNRlRVVbmPQWIQ1dXV0Ov1MJvNqK6uRvv27SVTmmruYBDJJtVz8ODBmDdvHoYPHy6BEZMjJu3q1auoq6uD0WiUMZJbGWSz2WA0GgEAtbW18PHxadbMv/nmmwgJCYHD4ZDM0Wg0OHLkCLKzs5s0lOK7qKgozJkzRxp4T09PGI1G/Prrr4iPj8fEiRMbMOb6CTaZTHA4HDAajS2yhdrmUtxut0s7dPnyZXTs2LHJ+wW7nnvuOYSHhze4JygoCNnZ2U0mxMR3Xbt2xbRp01zUPTMzE1999RUWLFggnYiwRY21yspKeHp6SqCaGyQ2CyBhiKurq+Hr64tz584hNDS0WTS9fPmyZJDwIFqttll24Poo+8KFC8jKysLGjRthMpmg1+tRW1sLPz+/G2YfBWNPnz6NDh064Nq1ay4yuU3FBIU9PT1RVFSExMREqQJNzYZGo4FWq5UACa+j0WiaDYxOp8PKlSuxbNkyXLx4Ufar1+tlPzdLzZ47dw6enp7Sg7ndzQNAaWkpgoKCcP78eQQEBMDDwwO1tbVu3dkQhtVms8HX1xdz5sxBnz59kJyc7BKFC3vT3N2SwsJCRERE4Ny5c8020M1O2ovOysrKEBISguPHj0Or1SIgIMBt2zRCcJvNBi8vL8yePRv5+flYuHAhAgICJOucgXEOM5oyDwDw559/ws/PD+Xl5e7f1XAGyMfHB6WlpXIF7TyI1jSdTiftgcFgwAsvvIBff/0VK1euRFhYmIy7bDZbo96uKYBIQlVVmEwmXLp0Cf7+/jh79qy0TW4HqKSkBP7+/rh48SLq6uoQFRXVYgaJe8Xs19fXw+Fw4Mknn8ShQ4eQnZ2NqKgoWK1WufVzI2FuxiAx7qKiIlgsFqiqipqamhZNaLNtkFarlWsxo9GIEydOoE+fPi0K9pyDOKEq48aNw9y5c/Hwww9Ld62qqjTs4jPn8KG5DBKO4fDhw+jQoQOqqqpAsknQb8lIA0BFRQUCAgKQm5uLYcOGSaGb4wFJQq/XAwB8fHzw5ZdfYuzYsS6U1+l0NwT3enCc139NtdzcXEREROD06dMtUq8W7ayKTouKihAVFYV9+/ahe/fu8PX1la7+Rsyx2+3Q6/XQarU4efIkUlJS8NNPP2Hs2LEwm80NFrs3Auj63xBe70YTIgz/0aNHERERgZMnT7bIg7UKoD/++ANhYWHIz8+HRqORK2YhnBBCqImIVQoLCzFjxgz06tULn3/+OWpqaqQQTcVEN2OoM6jCCwo1UhQFhYWFqKyshLe3N0pLS5sdQbdqb15VVVRWVsJgMMBkMuHMmTMYMWJEA2Mp7IfVakVxcTHS09ORkJCAjRs3wmKxQKPRyOSXu/beRXZArMM2btyIgoIC/Pzzz+jYsSMqKiqkV7ttxQtCmJKSEgQHB+Pbb7/FqFGj5LpLpCSsViuCg4Oxbt06rFy5EhkZGaipqYFOp5MG2l2BpUiziIh99+7dGDhwIGbNmoWwsDB8+eWXiI2NlZsILc1mqi2dJQA4duwYHnjgAezYsQMxMTEyvWmz2eDn54eFCxfit99+w0svvQSr1SrVyGq1tojeznnmxtisqiqMRiNUVUVubi4effRRJCcn48CBA0hJSYFOp8Phw4cRGhoqAWrp77cIIJGw+uOPPxASEoLff/8dJpMJw4cPh8FgwGuvvYb8/HxkZGTA39+/gUtvbTObzY0uR65du4bff/8dzz77LPr3749du3bBYDAAACZNmoSdO3fC29sbV69ehdlsvqmtc4ubV1UVFosFlZWV6NSpE3JycjB//nzMmjULPXv2lDMusoC3migDAIvFAkVRoNfrZU68R48emD17NsaOHYvy8nKoqgqdTgez2Qx/f38kJydj5MiR6N27N44cOdIq9Woxg5wHfejQITz00EPYtm0bIiMj0bNnT8kUnU7XqtlqKpsocslhYWHIyspCXl4epkyZgrq6ugbbSBMmTMDVq1eRl5cnma6qaqtYrLbGW6iqioKCAnTu3BmFhYU4ceKEjIWEIReDae06TbhsRVFQU1MDLy8vLF68GEePHsXLL78Mg8GAK1euyDy5M0NmzZqFDRs2IDw8HGfPnpVxVqu2mlrrPex2O86cOYNu3brJ1KmzrRGvjUXGjTHyesaI9GhdXR06deqEvLw8vPHGG+jYsaNklF6vlxMiWPTII48gMjIS2dnZ6NevH3744YdmR/tuA0j82P79+9GvXz989tlnMJlMLmolBL9RSqSioqIBQHa7HXa7Xaro119/jYSEBFRVVaF79+5yv915m0fs1opQIz09HZ9//jk0Gg3MZjMuX77coEi0xWxGKyvGADA1NZWRkZFct26drOlxfn3nnXeoKIrcYxfPRUdHkyRtNpu8RNu7dy+HDx8ui6SKi4tpt9tpt9tJUr4eP35cFlEpisK4uDiS5P33389p06bJOoBbrBdqfbGUoigMDw+XIFmtVtpsNjocDinwnj17GhQKiPcZGRl0bocOHeKYMWNcKsi2b98ugRTNarXS4XBw69atBECDwUAA3LVrF7/77jsGBgYyLS2tQbEo7nSFmWBFWloaQ0JCuHXrVimMw+EgSVZVVTEwMJCKokhgVFWVRU8jRoxgQUEBMzIyZJVIdHQ0J0+ezIMHD7owxhkgkhw8eLCcrF69epEko6Ki+MILLzAyMtLlN9sEIMGiiIgIpqamsmvXrrRYLLRarbTb7VKQ119/nQBoNBpdqsG6devGd999l3///TdLSkp47tw5lpaWsr6+XoLhDI7D4WBdXR1JcufOnVQUhTqdjgB4+PBhfvrppwwKCuIrr7ziLvbceo2imKG0tDSGhoZy+fLlJEmLxUKbzUa73c6KigqGhobKZ4KDg7lixQqaTCbeqIlnnZvZbCZJnj59miEhIZLBKSkpJMlOnTpx9uzZDAkJcWet4q0XbiqKwuDgYM6bN4/e3t68dOmSNLyCDQUFBezZsyfT09NZUlIihbZYLHQ4HHQ4HNIQi78Fa4TNIcnDhw/z3nvvlTbK09OTV65c4YIFCxgbG8vnn3++2cVRuFNVroLKzz77LBMTE/nMM89I4YWabN++nWPGjGFxcbEU3GKxSJUUjLHb7bTZbDSbzfJ50VdmZiY9PDwIgJ6engTADRs2sLi4mHq9nosWLWK7du3cCY77yoA1Gg09PDy4ZMkSarVaWcW6Y8cOJiUlyfu8vLy4YMECnj59ms1p1dXVzMnJYUJCQgMD369fP5Jkr169mJKSwiFDhrg4D/yTjiKIXdbExETExMTgm2++QVlZGaZOnYqtW7fCYDDIlAgAtGvXDv3790dSUhJ69OiBwMBAGAwGkITJZMKpU6eQm5uLffv2yUo1ESCKKPvs2bP4+OOPsWTJEjz//PNYunSp3DtzZ3P7AZXZs2eze/funDp1KknywQcfdDmU0lLvImqxFUWR7Pnkk0944cIFAmB6eroMJW7DoRf3n8nw8vJiZmYmAfDrr7/mhQsX6Onp6XJeQwAlImHxnbi0Wq08xiCEFi79xRdfJElGRERwwoQJHDFihDvd+u0FSAyyV69enD9/PhVFYVlZGb/99ttWH21yXqqIgHDKlCmMioriq6++6gIe/hsOs4jBTp48mY8//jjDwsJIksuWLWuVERWgBwUFsaqqiu+//z41Gg2XLVtGLy8veYThNp0puw2H0JzszKJFixgdHc0RI0aQpDyc0twZV1VVquKxY8eYn5/v0q+bY547dxxKgOTh4cGVK1eyffv2TE1NJUlOnjy5WUxyBnrnzp2srKyk0WhkamoqH330Ube7dLTFeTEADAsL4+rVqwmAb7/9NknKg3Q6na5R1XA26B999BFJMjg4mI899hhffPHFJp/9rwHImf5xcXF85513CIBZWVkkyUmTJjUqqDNzsrOzSZLx8fF86KGHmJ6efjs91p0HyFkNBg0axKVLlxIA165dS5KcPn26FFjEMQJUcRJxyJAhDA8P59KlS10SZP8agJxBGjlypARpxYoVJMmFCxc2UKv333+fJDl8+HDec889XLVqFdu1a3cnjHLbAOQM0pgxY6S6vfHGGyTJDz74QLLniy++kOAEBgZyzZo1DAgIcEf69J8NEAC5VEhOTuaKFSsIgBMmTCBJfv/999y3bx9JcsCAAQwKCuLatWvlObA7fNq5bQByFnTgwIFcv349vb29OWDAAJnmiIuLY2hoKNevX8+goKC2UKu2BcgZpLi4OGZnZzM0NJQhISHs0qUL4+LimJWVxU6dOrU1OG0HkHM03aVLF27atImJiYns378/V61aRW9v77ZUq7b71xQ3yiMZjUakp6fDbrfjrbfeksWcrT2d6K7W5gCJbWOHw9GgQLytwfnHANTY1vStbBX/KwH6p7a7/8PsJu1/AIi0dlIiP2WAAAAAAElFTkSuQmCC";


const NOMBRES = {
  "ULP":"ULP","ALB-VGX B":"Alberti (Vikingas)","BPLP B":"Banco Provincia B",
  "BPLP C":"Banco Provincia C","CEYE B":"CEYE B","EL CRUCE B":"El Cruce B",
  "EL CRUCE C":"El Cruce C","JUVE B":"Juventud B","SAN MARTIN LH":"San Martin LH",
  "UNLP C":"UNLP C","VILLA GARIBALDI":"Villa Garibaldi","SUDA B":"SUDA B",
  "CF IGN CORR":"CF Ignacio Correa","EMVM B":"EMVM B","SMLH":"SMLH",
};
const N = (id) => NOMBRES[id] || id;

const VENUES = {
  "UNLP":          { dir:"C. 50 197, La Plata",              maps:"https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=ar&sa=X&geocode=KVWzaEJA5qKVMS_PsW0yR85c&daddr=C.+50+197,+B1900+La+Plata,+Provincia+de+Buenos+Aires" },
  "BPLP":          { dir:"Av. 476 entre 20 y 21, City Bell", maps:"https://www.google.com/maps?daddr=476,+entre+20+y+21,+B1986+City+Bell,+Provincia+de+Buenos+Aires" },
  "EL CRUCE":      { dir:"C. 522, Tolosa",                   maps:"https://www.google.com/maps/dir//Club+%22El+Cruce%22,+C.+522,+B1906+Tolosa,+Provincia+de+Buenos+Aires/@-34.919056,-57.9503485,15z" },
  "JUVE":          { dir:"C. 35 330, La Plata",              maps:"https://www.google.com/maps/dir/-34.9278943,-57.9477719/Club+Juventud,+C.+35+330,+B1902+La+Plata" },
  "VILLA GARIBALDI":{ dir:"Lavalle 1592, Magdalena",         maps:"https://www.google.com/maps?daddr=Lavalle+1592,+B1913+Magdalena,+Provincia+de+Buenos+Aires" },
  "CRIM":          { dir:"C. 145 Bis 1257, Los Hornos",      maps:"https://maps.app.goo.gl/Th8iX7pw1qu5TT5C7" },
  "SUDA":          { dir:"C. 5 536, Tolosa",                 maps:"https://www.google.com/maps?daddr=C.+5+536,+B1906DZL+Tolosa,+Provincia+de+Buenos+Aires" },
  "CEYE":          { dir:"Perseverancia 4473, Berisso",      maps:"https://maps.app.goo.gl/GpyeHa8BLuYtJMZG8" },
  "ALBERTI":       { dir:"27 entre 37 y 38, La Plata",       maps:"https://maps.app.goo.gl/xSQNHRTWdDXcEcDp7" },
  "CEDEN":         { dir:"Sede a confirmar",                  maps:null },
};
const getVenue = (c) => VENUES[c] || null;

const PARTIDOS_RAW = [
  { f:1,  dia:"DOM 12/4",  local:"ULP",            visita:"SAN MARTIN LH",   hora:"13.30", cancha:"ULP",            cond:"LOCAL"  },
  { f:2,  dia:"SAB 19/4",  local:"CF IGN CORR",    visita:"ULP",             hora:"",      cancha:"",               cond:"VISITA", libre:true },
  { f:3,  dia:"DOM 26/4",  local:"ULP",            visita:"ALB-VGX B",       hora:"13.30", cancha:"ULP",            cond:"LOCAL"  },
  { f:4,  dia:"SAB 3/5",   local:"EMVM B",         visita:"ULP",             hora:"",      cancha:"",               cond:"VISITA", libre:true },
  { f:5,  dia:"DOM 10/5",  local:"ULP",            visita:"VILLA GARIBALDI", hora:"12.00", cancha:"ULP",            cond:"LOCAL"  },
  { f:6,  dia:"DOM 17/5",  local:"UNLP C",         visita:"ULP",             hora:"14.30", cancha:"UNLP",           cond:"VISITA" },
  { f:7,  dia:"DOM 24/5",  local:"ULP",            visita:"BPLP B",          hora:"13.30", cancha:"ULP",            cond:"LOCAL",  libre:true },
  { f:8,  dia:"DOM 31/5",  local:"BPLP C",         visita:"ULP",             hora:"10.30", cancha:"BPLP",           cond:"VISITA" },
  { f:9,  dia:"DOM 7/6",   local:"ULP",            visita:"JUVE B",          hora:"13.30", cancha:"ULP",            cond:"LOCAL"  },
  { f:10, dia:"DOM 14/6",  local:"ULP",            visita:"CEYE B",          hora:"13.30", cancha:"ULP",            cond:"LOCAL"  },
  { f:11, dia:"DOM 21/6",  local:"EL CRUCE B",     visita:"ULP",             hora:"",      cancha:"EL CRUCE",       cond:"VISITA", libre:true },
  { f:12, dia:"DOM 28/6",  local:"ULP",            visita:"EL CRUCE B",      hora:"13.30", cancha:"ULP",            cond:"LOCAL"  },
  { f:13, dia:"SAB 4/7",   local:"EL CRUCE C",     visita:"ULP",             hora:"15.00", cancha:"EL CRUCE",       cond:"VISITA" },
  { f:14, dia:"CEDE",      local:"SAN MARTIN LH",  visita:"ULP",             hora:"CEDE",  cancha:"CEDEN",          cond:"VISITA" },
  { f:15, dia:"DOM 9/8",   local:"ULP",            visita:"CF IGN CORR",     hora:"",      cancha:"ULP",            cond:"LOCAL",  libre:true },
  { f:16, dia:"SAB 15/8",  local:"ALB-VGX B",      visita:"ULP",             hora:"14.30", cancha:"ALBERTI",        cond:"VISITA" },
  { f:17, dia:"DOM 23/8",  local:"ULP",            visita:"EMVM B",          hora:"",      cancha:"ULP",            cond:"LOCAL",  libre:true },
  { f:18, dia:"DOM 30/8",  local:"VILLA GARIBALDI",visita:"ULP",             hora:"14.00", cancha:"VILLA GARIBALDI",cond:"VISITA" },
  { f:19, dia:"DOM 6/9",   local:"ULP",            visita:"UNLP C",          hora:"13.30", cancha:"ULP",            cond:"LOCAL"  },
  { f:20, dia:"DOM 13/9",  local:"BPLP B",         visita:"ULP",             hora:"12.30", cancha:"BPLP",           cond:"VISITA" },
  { f:21, dia:"DOM 20/9",  local:"ULP",            visita:"BPLP C",          hora:"13.30", cancha:"ULP",            cond:"LOCAL"  },
  { f:22, dia:"SAB 26/9",  local:"JUVE B",         visita:"ULP",             hora:"10.30", cancha:"JUVE",           cond:"VISITA" },
  { f:23, dia:"DOM 4/10",  local:"CEYE B",         visita:"ULP",             hora:"13.30", cancha:"ULP",            cond:"VISITA" },
  { f:24, dia:"DOM 11/10", local:"BPLP C",         visita:"ULP",             hora:"10.30", cancha:"BPLP",           cond:"VISITA" },
  { f:25, dia:"SAB 17/10", local:"EL CRUCE B",     visita:"ULP",             hora:"12.30", cancha:"EL CRUCE",       cond:"VISITA" },
  { f:26, dia:"SAB 24/10", local:"ULP",            visita:"EL CRUCE C",      hora:"",      cancha:"ULP",            cond:"LOCAL",  libre:true },
];

const RESULTADOS_INICIALES = {
  1: { gL:3, gV:1, sets:[[25,11],[22,25],[25,10],[25,20]], src:"cf" }, // ULP 3-1 SMLH
  3: { gL:3, gV:0, sets:[[25,10],[25,20],[25,10]],         src:"cf" }, // ULP 3-0 ALB-VGX B
  5: { gL:3, gV:0, sets:[[25,12],[25,22],[25,13]],         src:"cf" }, // ULP 3-0 Villa Garibaldi
};

const RANKING_BASE = [
  { equipo:"ULP",            pts:9, j:3, g:3, p:0, sf:9,  sc:1  },
  { equipo:"BPLP B",         pts:9, j:4, g:3, p:1, sf:10, sc:4  },
  { equipo:"UNLP C",         pts:9, j:4, g:3, p:1, sf:9,  sc:6  },
  { equipo:"VILLA GARIBALDI",pts:6, j:4, g:2, p:2, sf:6,  sc:6  },
  { equipo:"SUDA B",         pts:3, j:1, g:1, p:0, sf:3,  sc:0  },
  { equipo:"BPLP C",         pts:3, j:2, g:1, p:1, sf:4,  sc:3  },
  { equipo:"EL CRUCE B",     pts:3, j:2, g:1, p:1, sf:4,  sc:3  },
  { equipo:"SMLH",           pts:3, j:3, g:1, p:2, sf:4,  sc:7  },
  { equipo:"JUVE B",         pts:3, j:4, g:1, p:3, sf:5,  sc:10 },
  { equipo:"CEYE B",         pts:2, j:2, g:1, p:1, sf:4,  sc:5  },
  { equipo:"ALB-VGX B",      pts:1, j:5, g:0, p:5, sf:2,  sc:15 },
];

const parseFecha = (s) => {
  if (!s || s === "CEDE") return null;
  const m = s.match(/(\d{1,2})\/(\d{1,2})(?!.*\d{1,2}\/\d{1,2})/);
  return m ? new Date(2026, +m[2]-1, +m[1]) : null;
};

const enriched = PARTIDOS_RAW.map(p => {
  const fd = parseFecha(p.dia);

  let estado = "futuro";
  if (!fd && p.dia === "CEDE") estado = "indefinido";
  else if (fd) {
    estado =
      fd < HOY
        ? "pasado"
        : fd.toDateString() === HOY.toDateString()
        ? "hoy"
        : "futuro";
  }

  return {
    ...p,
    fechaDate: fd,
    estado,

    // 🔥 FIX CLAVE: normalizamos el ID para que matchee Copafácil
    resKey: p.f
  };
});

const MESES_CAL_LIST = [...new Set(enriched.filter(p => p.fechaDate).map(p => p.fechaDate.getMonth()))];
const rivals = [...new Set(enriched.map(p => p.cond === "LOCAL" ? p.visita : p.local))].sort((a,b) => N(a).localeCompare(N(b)));

const getULPSets   = (res, p) => p.cond === "LOCAL" ? res.gL : res.gV;
const getRivalSets = (res, p) => p.cond === "LOCAL" ? res.gV : res.gL;
const calcRes = (res, p) => {
  if (!res || res.gL == null) return null;
  const u = getULPSets(res,p), r = getRivalSets(res,p);
  return u > r ? "G" : u < r ? "P" : "E";
};
const ptsVoley = (res, p) => {
  if (!res || res.gL == null) return 0;
  const u = getULPSets(res,p), r = getRivalSets(res,p);
  return u===3&&r<=1 ? 3 : u===3&&r===2 ? 2 : u===2&&r===3 ? 1 : 0;
};

const loadR = () => { try { const s=localStorage.getItem(SK); return s?JSON.parse(s):RESULTADOS_INICIALES; } catch { return RESULTADOS_INICIALES; } };
const saveR = (d) => { try { localStorage.setItem(SK, JSON.stringify(d)); } catch {} };
const loadTheme = () => { try { return localStorage.getItem(SK_THEME)==="dark"; } catch { return false; } };
const saveTheme = (d) => { try { localStorage.setItem(SK_THEME, d?"dark":"light"); } catch {} };

const getDiasCal = (y, m) => {
  const first=new Date(y,m,1).getDay(), total=new Date(y,m+1,0).getDate(), offset=first===0?6:first-1;
  return [...Array(offset).fill(null), ...Array.from({length:total},(_,i)=>i+1)];
};

const recalcULP = (res) => {
  const cr = enriched.filter(p =>
  Object.values(res).some(r =>
    r.m_set === p.f ||
    r.id === p.f ||
    r.match_id === p.f
  ) && !p.libre
)
  return { equipo:"ULP",
    pts: cr.reduce((a,p)=>a+ptsVoley(res[p.f],p),0),
    j:   cr.length,
    g:   cr.filter(p=>calcRes(res[p.f],p)==="G").length,
    p:   cr.filter(p=>calcRes(res[p.f],p)==="P").length,
    sf:  cr.reduce((a,p)=>a+getULPSets(res[p.f],p),0),
    sc:  cr.reduce((a,p)=>a+getRivalSets(res[p.f],p),0),
  };
};

const buildRankingLocal = (res, base) => {
  const ulp = recalcULP(res);
  return base.map(r => r.equipo==="ULP" ? ulp : r)
    .sort((a,b) => b.pts-a.pts || (b.sf-b.sc)-(a.sf-a.sc))
    .map((r,i) => ({...r, pos:i+1}));
};

// WhatsApp share
const compartirPartido = (p) => {
  if (!p) return;
  const rival = N(p.cond==="LOCAL" ? p.visita : p.local);
  const cond  = p.cond==="LOCAL" ? "Local" : "Visitante";
  const horaRaw = (!p.hora || p.hora==="CEDE") ? null : p.hora.replace(".",":") + "hs";
  const horaStr = horaRaw || "Horario a confirmar";
  const DIAS_NOMBRE = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
  const MESES_NOMBRE = ["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  let diaStr = p.dia;
  if (p.fechaDate) {
    const fd = p.fechaDate;
    diaStr = DIAS_NOMBRE[fd.getDay()] + " " + fd.getDate() + " de " + MESES_NOMBRE[fd.getMonth()+1];
  }
  const v   = p.cond==="VISITA" ? getVenue(p.cancha) : null;
  const dir = p.cond==="LOCAL" ? "Perseverancia 4473, Berisso" : (v ? v.dir : p.cancha);
  const mapsLink = v && v.maps ? v.maps : null;
  let calLink = "";
  if (p.fechaDate && horaRaw) {
    const parts = p.hora.split(".");
    const hh = parseInt(parts[0]), mm = parseInt(parts[1] || "0");
    const start = new Date(p.fechaDate);
    start.setHours(hh, mm, 0, 0);
    const end = new Date(start);
    end.setHours(end.getHours() + 2);
    const fmt = (d) => {
      const pad = n => String(n).padStart(2,"0");
      return d.getFullYear()+""+pad(d.getMonth()+1)+""+pad(d.getDate())+"T"+pad(d.getHours())+""+pad(d.getMinutes())+"00";
    };
    const calText  = encodeURIComponent("Voley ARVA U vs " + rival);
    const calDates = fmt(start) + "/" + fmt(end);
    const calLoc   = encodeURIComponent(dir);
    calLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + calText + "&dates=" + calDates + "&location=" + calLoc;
  }
  const lines = [
    "Este finde hay voley!",
    "Proximo partido vs *" + rival + "*",
    diaStr + " | " + cond + " | " + horaStr,
    dir,
    mapsLink ? "Ver en Maps: " + mapsLink : "",
    calLink  ? "Agregalo a tu calendario: " + calLink : "",
    "Veni a alentar a las chicas de la U!",
  ].filter(Boolean).join("\n");
  window.open("https://wa.me/?text=" + encodeURIComponent(lines), "_blank");
};

const fmtDia = (dia) => {
  if (!dia || dia === "CEDE") return dia || "";
  const parts = dia.split(" ");
  if (parts.length < 2) return dia;
  const [d, fecha] = parts;
  const [dd, mm] = fecha.split("/");
  const ms = ["","Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return d + " " + parseInt(dd) + " " + (ms[parseInt(mm)] || mm);
};

const RWIN = "#16a34a";
const RLOS = "#dc2626";
const rColor = (r) => r === "G" ? RWIN : RLOS;

const LIGHT = {
  bg:"#ffffff", surface:"#f4f4f4", elevated:"#e8e8e8",
  border:"#e0e0e0", borderStrong:"#aaaaaa",
  t1:"#000000", t2:"#111111", t3:"#777777",
  tabBg:"#000000", tabActive:"#ffffff", tabInactive:"#777777",
  heroBg:"#000000", heroText:"#ffffff", heroSub:"#999999",
  btnPri:"#000000", btnPriText:"#ffffff",
  btnSec:"#eeeeee", btnSecText:"#000000", btnSecBorder:"#dddddd",
  divider:"#eeeeee", secLabel:"#aaaaaa",
  inputBg:"#f4f4f4", inputBorder:"#dddddd",
  ulpRowBg:"#f0f0f0",
};
const DARK = {
  bg:"#000000", surface:"#141414", elevated:"#1e1e1e",
  border:"#2a2a2a", borderStrong:"#444444",
  t1:"#ffffff", t2:"#ffffff", t3:"#888888",
  tabBg:"#ffffff", tabActive:"#000000", tabInactive:"#888888",
  heroBg:"#141414", heroText:"#ffffff", heroSub:"#777777",
  btnPri:"#ffffff", btnPriText:"#000000",
  btnSec:"#1e1e1e", btnSecText:"#ffffff", btnSecBorder:"#2a2a2a",
  divider:"#1a1a1a", secLabel:"#555555",
  inputBg:"#1a1a1a", inputBorder:"#2a2a2a",
  ulpRowBg:"#1c1c1c",
};

const TEAM_LOGOS = {
  "JUVE B": "data:image/png;base64,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",
  "SMLH": "data:image/png;base64,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",
  "CEYE B": "data:image/png;base64,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",
  "ULP": "data:image/png;base64,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",
  "SUDA B": "data:image/png;base64,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",
  "EL CRUCE B": "data:image/png;base64,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",
  "BPLP B": "data:image/png;base64,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",
  "VILLA GARIBALDI": "data:image/png;base64,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",
  "ALB-VGX B": "data:image/png;base64,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",
  "UNLP C": "data:image/png;base64,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",
  "BPLP C": "data:image/png;base64,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",
  "EL CRUCE C": "data:image/png;base64,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",
  "SAN MARTIN LH": "data:image/png;base64,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",
};

export default function App() {
  const [tab,       setTab]       = useState("home");
  const [dark,      setDark]      = useState(() => loadTheme());
  const [res,       setRes]       = useState(loadR() || {});
  const [filtro,    setFiltro]    = useState("todos");
  const [rivalFil,  setRivalFil]  = useState("todos");
  const [vistaPartidos, setVistaPartidos] = useState("lista"); // "lista" | "calendario"
  const [calMesIdx, setCalMesIdx] = useState(() => {
    const m = HOY.getMonth(), idx = MESES_CAL_LIST.indexOf(m);
    return idx >= 0 ? idx : 1;
  });
  const [diaSelCal, setDiaSelCal] = useState(null);
  const [rankBase,  setRankBase]  = useState(RANKING_BASE);
  const [selUltimo, setSelUltimo] = useState(null);

  const T = dark ? DARK : LIGHT;
  useEffect(() => { setRes(loadR()); }, []);

  // Fetch ranking from copafacil via Vercel Function
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        // First explore the structure
        const exploreR = await fetch("/api/copafacil?type=explore");
        const explore  = await exploreR.json();
        console.log("Copafacil structure:", explore);

        // Try to get standing
        const standR = await fetch("/api/copafacil?type=standing");
        const stand  = await standR.json();
        console.log("Copafacil standing:", stand);

        if (stand && stand.data && !stand.error) {
          // Parse and update rankBase with copafacil data
          const raw = stand.data;
          if (Array.isArray(raw)) {
            const newBase = raw.map((team, i) => ({
              equipo: team.name || team.team_name || "?",
              pts:    team.pts  || team.points    || 0,
              j:      team.j    || team.played    || 0,
              g:      team.g    || team.won       || 0,
              p:      team.p    || team.lost      || 0,
              sf:     team.sf   || team.pf        || 0,
              sc:     team.sc   || team.pa        || 0,
            })).filter(t => t.equipo !== "ULP");
            if (newBase.length > 0) setRankBase(newBase);
          }
        }
      } catch(e) {
        console.log("Copafacil fetch error:", e.message);
      }
    };
    fetchRanking();
  }, []);

  const toggleTheme = () => { const nd=!dark; setDark(nd); saveTheme(nd); };

  const ranking    = buildRankingLocal(res, rankBase);
  const mesActual  = MESES_CAL_LIST[calMesIdx] ?? MESES_CAL_LIST[0];
  const diasCal    = getDiasCal(2026, mesActual);
  const pByDay     = {};
  enriched.forEach(p => { if (p.fechaDate) pByDay[p.fechaDate.getMonth()+"-"+p.fechaDate.getDate()] = p; });

  const conRes       = enriched.filter(p =>
  Object.values(res).some(r =>
    r.m_set === p.f ||
    r.id === p.f ||
    r.match_id === p.f
  ) && !p.libre
)
  const prox         = enriched.find(p => p.estado==="futuro" && !p.libre && p.dia!=="CEDE");

  const PJ  = conRes.length;
  const PG  = conRes.filter(p => calcRes(res[p.f],p)==="G").length;
  const PP  = conRes.filter(p => calcRes(res[p.f],p)==="P").length;
  const SF  = conRes.reduce((a,p)=>a+getULPSets(res[p.f],p),0);
  const SC  = conRes.reduce((a,p)=>a+getRivalSets(res[p.f],p),0);
  const PTS = conRes.reduce((a,p)=>a+ptsVoley(res[p.f],p),0);
  const jugados  = enriched.filter(p=>(p.estado==="pasado"||p.estado==="hoy")&&!p.libre).length;
  const restantes= enriched.filter(p=>p.estado==="futuro"&&!p.libre).length;
  const ulpPos   = ranking.find(r=>r.equipo==="ULP")?.pos ?? 1;
  const ultimos  = [...conRes].sort((a,b)=>(a.fechaDate||0)-(b.fechaDate||0)).slice(-5);
  const locCR    = conRes.filter(p=>p.cond==="LOCAL");
  const visCR    = conRes.filter(p=>p.cond==="VISITA");
  const PGL      = locCR.filter(p=>calcRes(res[p.f],p)==="G").length;
  const PGV      = visCR.filter(p=>calcRes(res[p.f],p)==="G").length;

  const filtrados = enriched
    .filter(p => filtro==="todos" || p.cond===filtro)
    .filter(p => rivalFil==="todos" || p.local===rivalFil || p.visita===rivalFil);
  const proximos = filtrados.filter(p => p.estado!=="pasado");
  const pasados  = filtrados.filter(p => p.estado==="pasado");


  const borrar    = (f) => { const n={...res}; delete n[f]; setRes(n); saveR(n); };

  const SectionLabel = ({ children, mt=0 }) => (
    <div style={{padding:(mt?20:14)+"px 20px 8px", display:"flex", alignItems:"center", gap:10}}>
      <span style={{fontSize:10, fontWeight:700, color:T.secLabel, letterSpacing:1.5, textTransform:"uppercase"}}>{children}</span>
      <div style={{flex:1, height:1, background:T.divider}}/>
    </div>
  );

  const BtnPri = ({ children, onClick, full=false, style={} }) => (
    <button onClick={onClick}
      style={{width:full?"100%":"auto", background:T.btnPri, border:"none", borderRadius:8,
        padding:"13px 18px", fontSize:14, fontWeight:700, color:T.btnPriText, cursor:"pointer", ...style}}>
      {children}
    </button>
  );

  const BtnSec = ({ children, onClick, style={} }) => (
    <button onClick={onClick}
      style={{background:T.btnSec, border:"1px solid "+T.btnSecBorder, borderRadius:8,
        padding:"11px 16px", fontSize:13, fontWeight:600, color:T.btnSecText, cursor:"pointer", ...style}}>
      {children}
    </button>
  );

  const MatchCard = ({ p }) => {
    const rival   = p.cond==="LOCAL" ? p.visita : p.local;
    const esLibre = !!p.libre;
    const noHora  = !p.hora || p.hora==="CEDE";
    const r       = res[p.f] ? calcRes(res[p.f],p) : null;
    const isPast  = p.estado==="pasado";
    const v       = p.cond==="VISITA" && !esLibre ? getVenue(p.cancha) : null;

    if (esLibre) {
      return (
        <div style={{padding:"14px 20px", borderBottom:"1px solid "+T.divider,
          background:dark?"#0f0f0f":"#fafafa", borderLeft:"3px solid "+T.border}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <span style={{fontSize:11, color:T.t3}}>{"Fecha "+p.f}</span>
            <span style={{fontSize:11, color:T.border}}>-</span>
            <span style={{fontSize:11, color:T.t3}}>{fmtDia(p.dia)}</span>
            <span style={{marginLeft:"auto", fontSize:10, fontWeight:700,
              background:T.elevated, color:T.t3, padding:"2px 8px", borderRadius:4,
              letterSpacing:.5, textTransform:"uppercase"}}>Fecha libre</span>
          </div>
        </div>
      );
    }
    return (
      <div style={{padding:"16px 20px", borderBottom:"1px solid "+T.divider,
        opacity:isPast?.6:1, borderLeft:r?"3px solid "+rColor(r):"3px solid transparent", background:T.bg}}>
        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:9}}>
          <span style={{fontSize:11, color:T.t3}}>{"Fecha "+p.f}</span>
          <span style={{fontSize:11, color:T.border}}>-</span>
          <span style={{fontSize:11, color:T.t3}}>{fmtDia(p.dia)}</span>
          <span style={{fontSize:11, color:T.border}}>-</span>
          <span style={{fontSize:11, color:T.t2}}>{p.cond==="LOCAL"?"Local":"Visitante"}</span>
          {p.estado==="hoy" && (
            <span style={{marginLeft:"auto", fontSize:10, fontWeight:700, color:T.t1,
              border:"1px solid "+T.borderStrong, padding:"1px 7px", borderRadius:3, letterSpacing:.8}}>HOY</span>
          )}
        </div>
        <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:8}}>
          <TeamBadge equipo="ULP" size={28}/>
          <span style={{fontFamily:"Archivo Black,sans-serif", fontSize:19, fontWeight:900,
            color:isPast?T.t3:T.t1, letterSpacing:"-0.5px"}}>ULP</span>
          {r ? (
            <span style={{fontSize:19, fontWeight:900, color:rColor(r), fontFamily:"Archivo Black,sans-serif",
              letterSpacing:"-0.5px", minWidth:52, textAlign:"center"}}>
              {getULPSets(res[p.f],p)+" — "+getRivalSets(res[p.f],p)}
            </span>
          ) : (
            <span style={{fontSize:13, color:T.t3, minWidth:24, textAlign:"center"}}>vs</span>
          )}
          <TeamBadge equipo={rival} size={28}/>
          <span style={{fontFamily:"Archivo Black,sans-serif", fontSize:19, fontWeight:900,
            color:isPast?T.t3:T.t2, letterSpacing:"-0.5px", flex:1,
            overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{N(rival)}</span>
          {res[p.f] && (
            <button onClick={()=>compartirPartido(prox||p)}
              style={{background:"none", border:"none", fontSize:18, cursor:"pointer", padding:"0 2px", flexShrink:0}}>
              📲
            </button>
          )}
        </div>
        {!r && !noHora && (
          <div style={{fontSize:12, color:T.t3, marginBottom:v?4:0}}>
            {p.hora.replace(".",":")}{"hs - "+(p.cond==="LOCAL"?"Perseverancia 4473, Berisso":p.cancha)}
          </div>
        )}
        {res[p.f] && res[p.f].sets && res[p.f].sets.length>0 && (
          <div style={{fontSize:11, color:T.t3, marginTop:4}}>
            {res[p.f].sets.map(([a,b])=>a+"-"+b).join("  /  ")}
          </div>
        )}
        {v && v.maps && !r && (
          <a href={v.maps} target="_blank" rel="noopener noreferrer"
            style={{display:"inline-block", marginTop:7, fontSize:12, color:T.t1, fontWeight:600,
              textDecoration:"underline", textUnderlineOffset:2}}>
            Ver en Maps
          </a>
        )}
      </div>
    );
  };

  const ProxVenue = () => {
    if (!prox) return null;
    const v   = prox.cond==="VISITA" ? getVenue(prox.cancha) : null;
    const dir = prox.cond==="LOCAL" ? "Perseverancia 4473, Berisso" : (v ? v.dir : prox.cancha);
    return (
      <div style={{fontSize:12, color:T.heroSub, marginBottom:16}}>
        {dir}
        {v && v.maps && (
          <span>
            <br/>
            <a href={v.maps} target="_blank" rel="noopener noreferrer"
              style={{color:dark?"#aaa":"#ccc", textDecoration:"underline", textUnderlineOffset:2, fontSize:12, fontWeight:600}}>
              Ver en Maps
            </a>
          </span>
        )}
      </div>
    );
  };

  const CalDetalle = () => {
    if (!diaSelCal) return null;
    const p = pByDay[mesActual+"-"+diaSelCal];
    if (!p) {
      return (
        <div style={{marginTop:14, padding:"14px 18px", background:T.surface, borderRadius:10,
          border:"1px solid "+T.border, fontSize:13, color:T.t3}}>
          Sin partido este dia
        </div>
      );
    }
    const rival = p.cond==="LOCAL" ? p.visita : p.local;
    const r     = res[p.f] ? calcRes(res[p.f],p) : null;
    const v     = p.cond==="VISITA" && !p.libre ? getVenue(p.cancha) : null;
    return (
      <div style={{marginTop:14, background:T.surface,
        border:r?"1px solid "+T.border:"1px solid "+T.border,
        borderLeft:r?"3px solid "+rColor(r):"1px solid "+T.border,
        borderRadius:10, overflow:"hidden"}}>
        <div style={{padding:"16px 18px"}}>
          <div style={{fontSize:11, color:T.t3, marginBottom:8}}>{"Fecha "+p.f+" - "+fmtDia(p.dia)}</div>
          {p.libre ? (
            <div style={{fontSize:13, color:T.t3}}>Fecha libre</div>
          ) : (
            <div>
              <div style={{fontFamily:"Archivo Black,sans-serif", fontSize:19, fontWeight:900,
                color:T.t1, marginBottom:6, letterSpacing:"-0.5px"}}>
                <div style={{display:"flex", alignItems:"center", gap:8, flexWrap:"wrap"}}>
                  <span>ULP vs</span>
                  <TeamBadge equipo={rival} size={26}/>
                  <span>{r && <span style={{color:rColor(r)}}>{getULPSets(res[p.f],p)+" - "+getRivalSets(res[p.f],p)+" "}</span>}{N(rival)}</span>
                </div>
              </div>
              <div style={{fontSize:12, color:T.t3, marginBottom:6}}>
                {(p.cond==="LOCAL"?"Local":"Visitante")+" - "+((!p.hora||p.hora==="CEDE")?"Hora a confirmar":p.hora.replace(".",":")+"hs")}
              </div>
              {res[p.f] && res[p.f].sets && res[p.f].sets.length>0 && (
                <div style={{fontSize:11, color:T.t3, marginBottom:6}}>
                  {res[p.f].sets.map(([a,b])=>a+"-"+b).join(" / ")}
                </div>
              )}
              {v && v.maps && (
                <a href={v.maps} target="_blank" rel="noopener noreferrer"
                  style={{fontSize:12, color:T.t1, fontWeight:600, textDecoration:"underline", textUnderlineOffset:2}}>
                  Ver en Maps
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Team badge logos
  const TEAM_COLORS = {
    "ULP":            ["#000000","#ffffff"],
    "SAN MARTIN LH":  ["#8b0000","#ffffff"],
    "SMLH":           ["#8b0000","#ffffff"],
    "ALB-VGX B":      ["#1a3a6b","#ffffff"],
    "VILLA GARIBALDI":["#cc3300","#ffffff"],
    "UNLP C":         ["#003087","#ffffff"],
    "BPLP B":         ["#003399","#ffffff"],
    "BPLP C":         ["#003399","#eecc00"],
    "EL CRUCE B":     ["#005500","#ffffff"],
    "EL CRUCE C":     ["#005500","#ffcc00"],
    "JUVE B":         ["#ffcc00","#000000"],
    "CEYE B":         ["#cc6600","#ffffff"],
    "SUDA B":         ["#006633","#ffffff"],
    "CF IGN CORR":    ["#550088","#ffffff"],
    "EMVM B":         ["#884400","#ffffff"],
  };
  const TeamBadge = ({ equipo, size=32 }) => {
    const logo = equipo === "ULP" ? (dark ? ESCUDO_DARK : ESCUDO) : TEAM_LOGOS[equipo];
    if (logo) {
      return (
        <div style={{width:size, height:size, borderRadius:"50%", flexShrink:0, overflow:"hidden",
          border:"1px solid rgba(0,0,0,.10)"}}>
          <img src={logo} alt={N(equipo)} style={{width:"100%", height:"100%", objectFit:"cover", display:"block"}}/>
        </div>
      );
    }
    const [bg, fg] = TEAM_COLORS[equipo] || ["#555","#fff"];
    const words = N(equipo).split(" ").filter(w=>w.length>1);
    const initials = words.length>=2 ? words[0][0]+words[1][0] : words[0]?.substring(0,2) || "?";
    return (
      <div style={{width:size, height:size, borderRadius:"50%", background:bg, flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"center",
        border:"1px solid rgba(0,0,0,.08)"}}>
        <span style={{fontSize:size*.33, fontWeight:900, color:fg,
          fontFamily:"Archivo Black,sans-serif", lineHeight:1, letterSpacing:"-0.5px"}}>
          {initials.toUpperCase()}
        </span>
      </div>
    );
  };

  const tabList = [
    {id:"home",   label:"Inicio"},
    {id:"lista",  label:"Partidos"},
    {id:"stats",  label:"Tabla"},
  ];

  return (
    <div style={{fontFamily:"'Archivo','Helvetica Neue',sans-serif", background:T.bg, minHeight:"100vh",
      color:T.t1, maxWidth:480, margin:"0 auto", transition:"background .2s,color .2s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Archivo+Black&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        button,select,input{font-family:inherit;cursor:pointer;}
        ::-webkit-scrollbar{display:none;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        input[type=number]{-moz-appearance:textfield;}
        a{-webkit-tap-highlight-color:transparent;}
        button{-webkit-tap-highlight-color:transparent;}
      `}</style>

      {/* HEADER + TABS — único bloque sticky para evitar overlap */}
      <div style={{position:"sticky", top:0, zIndex:100, background:T.bg, transition:"background .2s"}}>
        {/* HEADER */}
        <div style={{borderBottom:"1px solid "+T.divider, padding:"18px 20px 12px"}}>
          <div style={{display:"flex", alignItems:"center", gap:14}}>
            <img alt="ULP" style={{width:40, height:40, objectFit:"contain",
              display:"block"}} src={dark ? ESCUDO_DARK : ESCUDO}/>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Archivo Black,sans-serif", fontSize:17, fontWeight:900,
                color:T.t1, lineHeight:1, letterSpacing:"-0.3px"}}>VOLEY ARVA U</div>
              <div style={{fontSize:10, color:T.t3, marginTop:3}}>Club Universitario de La Plata - Sub 18 C - 2026</div>
            </div>
            <div style={{display:"flex", alignItems:"center", gap:10}}>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"Archivo Black,sans-serif", fontSize:20, fontWeight:900, color:T.t1, lineHeight:1}}>{"#"+ulpPos}</div>
                <div style={{fontSize:9, color:T.t3, marginTop:2, letterSpacing:.5}}>tabla</div>
              </div>
              <button onClick={toggleTheme}
                style={{background:T.surface, border:"1px solid "+T.border, borderRadius:20,
                  padding:"6px 10px", fontSize:16, color:T.t3, lineHeight:1}}>
                {dark ? "\u2600\uFE0F" : "\uD83C\uDF19"}
              </button>
            </div>
          </div>
        </div>
        {/* TABS */}
        <div style={{background:T.tabBg, display:"flex", overflowX:"auto",
          borderBottom:"1px solid "+(dark?"#1a1a1a":"#dddddd")}}>
          {tabList.map(({id, label}) => (
            <button key={id} onClick={() => setTab(id)}
              style={{flex:"0 0 auto", padding:"12px 20px", border:"none",
                borderBottom:tab===id ? "3px solid "+T.tabActive : "3px solid transparent",
                background:"transparent",
                color:tab===id ? T.tabActive : T.tabInactive,
                fontSize:13, fontWeight:tab===id?700:500, whiteSpace:"nowrap", cursor:"pointer"}}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{paddingBottom:24}}>

        {/* HOME */}
        {tab==="home" && (
          <div>
            {prox && (
              <div style={{margin:"20px 20px 0", background:T.heroBg, borderRadius:12, overflow:"hidden"}}>
                <div style={{padding:"10px 18px 0"}}>
                  <span style={{fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:T.heroSub}}>
                    {"Proximo - Fecha "+prox.f}
                  </span>
                </div>
                <div style={{padding:"14px 18px 18px"}}>
                  <div style={{fontSize:11, color:T.heroSub, marginBottom:10}}>{fmtDia(prox.dia)}</div>
                  <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:6}}>
                    <TeamBadge equipo="ULP" size={34}/>
                    <div style={{fontFamily:"Archivo Black,sans-serif", fontSize:22, fontWeight:900,
                      color:T.heroText, letterSpacing:"-1px", lineHeight:1.1}}>
                      {"ULP vs"}
                    </div>
                    <TeamBadge equipo={prox.cond==="LOCAL"?prox.visita:prox.local} size={34}/>
                    <div style={{fontFamily:"Archivo Black,sans-serif", fontSize:22, fontWeight:900,
                      color:T.heroText, letterSpacing:"-1px", lineHeight:1.1, flex:1,
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>
                      {N(prox.cond==="LOCAL"?prox.visita:prox.local)}
                    </div>
                  </div>
                  <div style={{fontSize:13, color:T.heroSub, marginBottom:14}}>
                    {(prox.cond==="LOCAL"?"Local":"Visitante")+" - "+((!prox.hora||prox.hora==="CEDE")?"Hora a confirmar":prox.hora.replace(".",":")+"hs")}
                  </div>
                  <ProxVenue/>
                  <button onClick={()=>compartirPartido(prox)}
                    style={{width:"100%", background:"#25D366", border:"none", borderRadius:8,
                      padding:"12px", fontSize:14, fontWeight:700, color:"#fff"}}>
                    Compartir por WhatsApp
                  </button>
                </div>
              </div>
            )}

            <div style={{margin:"16px 20px 0", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8}}>
              {[["Puntos",PTS,RWIN],["Ganados",PG,RWIN],["Perdidos",PP,RLOS],["Jugados",jugados,T.t1]].map(([l,v,c]) => (
                <div key={l} style={{background:T.surface, borderRadius:10, padding:"14px 6px",
                  textAlign:"center", border:"1px solid "+T.border}}>
                  <div style={{fontFamily:"Archivo Black,sans-serif", fontSize:22, fontWeight:900, color:c, lineHeight:1}}>{v}</div>
                  <div style={{fontSize:10, color:T.t3, marginTop:5}}>{l}</div>
                </div>
              ))}
            </div>

            {ultimos?.length > 0 && (
  <div>
    <SectionLabel mt={1}>Ultimos resultados</SectionLabel>

    <div style={{display:"flex", gap:8, padding:"0 20px"}}>
      {ultimos.map((p, i) => {
        const r = calcRes(res?.[p.f], p);
        const isSel = selUltimo === p.f;

        return (
          <div
            key={i}
            onClick={() => setSelUltimo(isSel ? null : p.f)}
            style={{
              flex: 1,
              background: isSel ? T.t1 : T.surface,
              border: "1px solid " + (isSel ? T.t1 : T.border),
              borderRadius: 8,
              padding: "10px 4px 6px",
              textAlign: "center",
              borderTop: "2px solid " + rColor(r),
              cursor: "pointer"
            }}
          >
            <div style={{fontSize:10, color:isSel ? T.bg : T.t3, marginBottom:4}}>
              {"F" + p.f}
            </div>

            <div style={{
              fontFamily:"Archivo Black,sans-serif",
              fontSize:10,
              fontWeight:900,
              color:isSel ? T.bg : rColor(r)
            }}>
              {r === "G" ? "Ganado" : r === "P" ? "Perdido" : "—"}
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}
                </div>
                {/* Detalle del partido seleccionado */}
                {selUltimo && (
  (() => {
    const p = enriched.find(x => x.f === selUltimo);
    if (!p || !res?.[p.f]) return null;
    const r = calcRes(res[p.f], p);
    const rival = p.cond === "LOCAL" ? p.visita : p.local;

    return (
      <div style={{
        margin:"10px 20px 0",
        background:T.surface,
        border:"1px solid "+T.border,
        borderLeft:"3px solid "+rColor(r),
        borderRadius:10,
        padding:"14px 16px"
      }}>
        <div style={{fontSize:10, color:T.t3, marginBottom:8}}>
          {"Fecha "+p.f+" - "+fmtDia(p.dia)+" - "+(p.cond==="LOCAL"?"Local":"Visitante")}
        </div>

        <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:6}}>
          <TeamBadge equipo="ULP" size={28}/>
          <span style={{fontFamily:"Archivo Black,sans-serif", fontSize:18, fontWeight:900, color:T.t1}}>
            ULP
          </span>

          <span style={{fontFamily:"Archivo Black,sans-serif", fontSize:18, fontWeight:900, color:rColor(r)}}>
            {getULPSets(res[p.f],p)+" - "+getRivalSets(res[p.f],p)}
          </span>

          <span style={{fontFamily:"Archivo Black,sans-serif", fontSize:18, fontWeight:900, color:T.t1}}>
            {N(rival)}
          </span>
        </div>
      </div>
    );
  })()
)}
                  const p = enriched.find(x=>x.f===selUltimo);
                  if (!p || !res[p.f]) return null;
                  const r = calcRes(res[p.f],p);
                  const rival = p.cond==="LOCAL" ? p.visita : p.local;
                  return (
                    <div style={{margin:"10px 20px 0", background:T.surface,
                      border:"1px solid "+T.border, borderLeft:"3px solid "+rColor(r),
                      borderRadius:10, padding:"14px 16px"}}>
                      <div style={{fontSize:10, color:T.t3, marginBottom:8}}>
                        {"Fecha "+p.f+" - "+fmtDia(p.dia)+" - "+(p.cond==="LOCAL"?"Local":"Visitante")}
                      </div>
                      <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:6}}>
                        <TeamBadge equipo="ULP" size={28}/>
                        <span style={{fontFamily:"Archivo Black,sans-serif", fontSize:18, fontWeight:900, color:T.t1}}>ULP</span>
                        <span style={{fontFamily:"Archivo Black,sans-serif", fontSize:18, fontWeight:900, color:rColor(r)}}>
                          {getULPSets(res[p.f],p)+" - "+getRivalSets(res[p.f],p)}
                        </span>
                        <TeamBadge equipo={rival} size={28}/>
                        <span style={{fontFamily:"Archivo Black,sans-serif", fontSize:18, fontWeight:900, color:T.t2,
                          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1}}>{N(rival)}</span>
                      </div>
                      {res[p.f].sets && res[p.f].sets.length>0 && (
                        <div style={{fontSize:12, color:T.t3}}>
                          {"Parciales: "+res[p.f].sets.map(([a,b])=>a+"-"+b).join(" / ")}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            <SectionLabel mt={1}>Proximos encuentros</SectionLabel>
            <div style={{background:T.surface, margin:"0 20px", borderRadius:10, border:"1px solid "+T.border, overflow:"hidden"}}>
              {enriched.filter(p=>p.estado==="futuro"&&p.dia!=="CEDE").slice(0,5).map((p,i,arr) => {
                const rival = p.cond==="LOCAL" ? p.visita : p.local;
                return (
                  <div key={i} style={{padding:"13px 16px", borderBottom:i<arr.length-1?"1px solid "+T.divider:"none",
                    display:"flex", alignItems:"center", gap:12, opacity:p.libre?.5:1}}>
                    <div style={{minWidth:28, fontSize:10, color:T.t3}}>{"F"+p.f}</div>
                    {p.libre ? (
                      <div style={{flex:1}}>
                        <div style={{fontSize:13, color:T.t3, fontStyle:"italic"}}>Fecha libre</div>
                        <div style={{fontSize:11, color:T.t3, marginTop:2}}>{fmtDia(p.dia)}</div>
                      </div>
                    ) : (
                      <>
                        <TeamBadge equipo={rival} size={26}/>
                        <div style={{flex:1, minWidth:0}}>
                          <div style={{fontSize:14, fontWeight:700, color:T.t1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                            {"vs "+N(rival)}
                          </div>
                          <div style={{fontSize:11, color:T.t3, marginTop:2}}>
                            {fmtDia(p.dia)+" - "+((!p.hora||p.hora==="CEDE")?"Hora a confirmar":p.hora.replace(".",":")+"hs")}
                          </div>
                        </div>
                        <div style={{fontSize:10, color:T.t3, flexShrink:0}}>
                          {p.cond==="LOCAL"?"Local":"Visitante"}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{padding:"12px 20px"}}>
              <BtnSec onClick={()=>setTab("lista")} style={{width:"100%", textAlign:"center"}}>Ver todos los partidos</BtnSec>
            </div>
          </div>
        )}

        {/* PARTIDOS - lista + calendario toggle */}
        {tab==="lista" && (
          <div>
            {/* toolbar: filtros + toggle vista */}
            <div style={{padding:"12px 20px", display:"flex", gap:8, flexWrap:"wrap",
              borderBottom:"1px solid "+T.divider, alignItems:"center"}}>
              {vistaPartidos==="lista" && <>
                {["todos","LOCAL","VISITA"].map(f => (
                  <button key={f} onClick={()=>setFiltro(f)}
                    style={{padding:"7px 14px", fontSize:12, fontWeight:600,
                      border:"1px solid "+(filtro===f?T.t1:T.border),
                      borderRadius:20, background:filtro===f?T.t1:"transparent",
                      color:filtro===f?T.bg:T.t2}}>
                    {f==="todos"?"Todos":f==="LOCAL"?"Local":"Visitante"}
                  </button>
                ))}
                <select value={rivalFil} onChange={e=>setRivalFil(e.target.value)}
                  style={{padding:"7px 10px", fontSize:12, fontWeight:500,
                    border:"1px solid "+T.border, borderRadius:20, background:T.bg,
                    color:T.t2, outline:"none", flex:1, minWidth:0}}>
                  <option value="todos">Todos los rivales</option>
                  {rivals.map(r=><option key={r} value={r}>{N(r)}</option>)}
                </select>
              </>}
              {vistaPartidos==="calendario" && (
                <div style={{flex:1}}/>
              )}
              {/* Toggle lista / calendario */}
              <div style={{display:"flex", background:T.surface, borderRadius:8, padding:2, border:"1px solid "+T.border, flexShrink:0}}>
                <button onClick={()=>setVistaPartidos("lista")}
                  style={{padding:"6px 10px", border:"none", borderRadius:6, fontSize:14,
                    background:vistaPartidos==="lista"?T.t1:"transparent",
                    color:vistaPartidos==="lista"?T.bg:T.t3, cursor:"pointer", lineHeight:1}}>
                  &#9776;
                </button>
                <button onClick={()=>setVistaPartidos("calendario")}
                  style={{padding:"6px 10px", border:"none", borderRadius:6, fontSize:14,
                    background:vistaPartidos==="calendario"?T.t1:"transparent",
                    color:vistaPartidos==="calendario"?T.bg:T.t3, cursor:"pointer", lineHeight:1}}>
                  &#9632;
                </button>
              </div>
            </div>

            {/* Vista lista */}
            {vistaPartidos==="lista" && (
              <div>
                {proximos.length > 0 && (
                  <div>
                    <SectionLabel>{"Por jugar - "+proximos.filter(p=>!p.libre).length+" partidos"}</SectionLabel>
                    {proximos.map((p,i) => <MatchCard key={i} p={p}/>)}
                  </div>
                )}
                {pasados.length > 0 && (
                  <div>
                    <SectionLabel mt={1}>{"Jugados - "+pasados.filter(p=>!p.libre).length+" partidos"}</SectionLabel>
                    {pasados.map((p,i) => <MatchCard key={i} p={p}/>)}
                  </div>
                )}
              </div>
            )}

            {/* Vista calendario */}
            {vistaPartidos==="calendario" && (
              <div style={{padding:"16px 20px"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16}}>
                  <button onClick={()=>{setCalMesIdx(i=>Math.max(0,i-1));setDiaSelCal(null);}}
                    disabled={calMesIdx===0}
                    style={{background:T.surface, border:"1px solid "+T.border, borderRadius:8,
                      padding:"8px 16px", color:calMesIdx===0?T.t3:T.t1, fontSize:16, fontWeight:700}}>{"<"}</button>
                  <div style={{fontFamily:"Archivo Black,sans-serif", fontSize:20, fontWeight:900,
                    color:T.t1, textTransform:"uppercase", letterSpacing:"-0.5px"}}>
                    {MESES[mesActual]}
                  </div>
                  <button onClick={()=>{setCalMesIdx(i=>Math.min(MESES_CAL_LIST.length-1,i+1));setDiaSelCal(null);}}
                    disabled={calMesIdx===MESES_CAL_LIST.length-1}
                    style={{background:T.surface, border:"1px solid "+T.border, borderRadius:8,
                      padding:"8px 16px", color:calMesIdx===MESES_CAL_LIST.length-1?T.t3:T.t1, fontSize:16, fontWeight:700}}>{">"}</button>
                </div>
                <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:8}}>
                  {["L","M","M","J","V","S","D"].map((d,i) => (
                    <div key={i} style={{textAlign:"center", fontSize:10, fontWeight:700,
                      color:T.t3, padding:"3px 0", letterSpacing:.8}}>{d}</div>
                  ))}
                </div>
                <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4}}>
                  {diasCal.map((dia,i) => {
                    if (!dia) return <div key={i}/>;
                    const p     = pByDay[mesActual+"-"+dia];
                    const r     = p && res[p.f] ? calcRes(res[p.f],p) : null;
                    const esHoy = HOY.getMonth()===mesActual && HOY.getDate()===dia;
                    const sel   = diaSelCal===dia;
                    const hasP  = p && !p.libre;
                    const cellBg = sel ? T.t1 :
                      p?.libre ? (dark?"#1a1a1a":"#f0f0f0") :
                      r === "G" ? RWIN :
                      r === "P" ? RLOS :
                      hasP ? (dark?"#333333":"#222222") :
                      "transparent";
                    const cellTextColor = sel ? T.bg :
                      p?.libre ? T.t3 :
                      (r || hasP) ? "#ffffff" :
                      esHoy ? T.t1 : T.t3;
                    return (
                      <div key={i} onClick={()=>{ if(p) setDiaSelCal(sel?null:dia); }}
                        style={{aspectRatio:"1", display:"flex", flexDirection:"column",
                          alignItems:"center", justifyContent:"center", borderRadius:8,
                          cursor:p?"pointer":"default",
                          background:cellBg,
                          border:esHoy&&!hasP?"2px solid "+T.borderStrong:"1px solid "+(hasP?cellBg:"transparent")}}>
                        <span style={{fontSize:13, fontWeight:hasP?700:400, lineHeight:1, color:cellTextColor}}>
                          {dia}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex", gap:14, marginTop:14, flexWrap:"wrap"}}>
                  {[[dark?"#1a1a1a":"#f0f0f0","Libre"],[dark?"#333333":"#222222","Partido"],[RWIN,"Ganado"],[RLOS,"Perdido"]].map(([bg,l]) => (
                    <div key={l} style={{display:"flex", alignItems:"center", gap:6}}>
                      <div style={{width:14, height:14, borderRadius:3, background:bg}}/>
                      <span style={{fontSize:11, color:T.t3}}>{l}</span>
                    </div>
                  ))}
                </div>
                <CalDetalle/>
              </div>
            )}
          </div>
        )}
        {/* TABLA (STATS) */}
{tab==="stats" && (
  <div style={{padding:"20px"}}>

    {/* RESUMEN GENERAL */}
    <div style={{background:T.surface, border:"1px solid "+T.border, borderRadius:10, padding:"18px", marginBottom:12}}>
      <div style={{fontSize:10, color:T.secLabel, letterSpacing:1.5, textTransform:"uppercase", marginBottom:16}}>
        Temporada 2026
      </div>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, textAlign:"center"}}>
        {[
          ["Partidos\njugados", PJ, T.t1],
          ["Ganados", PG, RWIN],
          ["Perdidos", PP, RLOS],
          ["Puntos", PTS, RWIN]
        ].map(([l,v,c]) => (
          <div key={l}>
            <div style={{fontFamily:"Archivo Black,sans-serif", fontSize:24, fontWeight:900, color:c}}>
              {v}
            </div>
            <div style={{fontSize:9, color:T.t3, marginTop:5, whiteSpace:"pre-line"}}>
              {l}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* EFICIENCIA LOCAL / VISITANTE */}
    {PJ > 0 && (
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12}}>
        {[
          ["Local ("+locCR.length+"PJ)", PGL, locCR.length],
          ["Visitante ("+visCR.length+"PJ)", PGV, visCR.length]
        ].map(([l,g,j]) => (
          <div key={l} style={{background:T.surface, border:"1px solid "+T.border, borderRadius:10, padding:"16px", textAlign:"center"}}>
            <div style={{fontFamily:"Archivo Black,sans-serif", fontSize:26, fontWeight:900, color:T.t1}}>
              {j>0 ? Math.round((g/j)*100) : 0}%
            </div>
            <div style={{fontSize:10, color:T.t3, marginTop:5}}>{l}</div>
            <div style={{fontSize:11, color:T.t3, marginTop:2}}>{g+" ganados"}</div>
          </div>
        ))}
      </div>
    )}

    {/* TABLA DE POSICIONES */}
    <div style={{background:T.surface, border:"1px solid "+T.border, borderRadius:10, overflow:"hidden"}}>

      <div style={{padding:"16px 20px 10px"}}>
        <div style={{fontSize:10, color:T.secLabel, letterSpacing:1.5, textTransform:"uppercase"}}>
          Tabla de posiciones
        </div>
      </div>

      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <thead>
          <tr>
            {["#","Equipo","Pts","J","G","SF","SC"].map((h,i) => (
              <th key={i} style={{
                fontSize:10,
                fontWeight:700,
                letterSpacing:1,
                color:T.secLabel,
                textTransform:"uppercase",
                padding:"8px 6px",
                textAlign:i<=1?"left":"center",
                paddingLeft:i===0?20:6
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {(ranking || []).map(r => (
            <tr key={r.equipo}
              style={{
                background: r.equipo==="ULP" ? T.ulpRowBg : T.bg,
                borderTop:"1px solid "+T.divider
              }}>

              <td style={{padding:"12px 6px 12px 20px", fontSize:12, fontWeight:700}}>
                {r.pos}
              </td>

              <td style={{padding:"11px 6px", fontSize:13, fontWeight:500}}>
                <div style={{display:"flex", alignItems:"center", gap:8}}>
                  <TeamBadge equipo={r.equipo} size={24}/>
                  <span>{N(r.equipo)}</span>
                </div>
              </td>

              <td style={{textAlign:"center"}}>{r.pts}</td>
              <td style={{textAlign:"center"}}>{r.j}</td>
              <td style={{textAlign:"center", color:r.g>0?RWIN:T.t3}}>{r.g}</td>
              <td style={{textAlign:"center"}}>{r.sf}</td>
              <td style={{textAlign:"center"}}>{r.sc}</td>

            </tr>
          ))}
        </tbody>
      </table>

      <div style={{padding:"10px 20px 14px", fontSize:10, color:T.t3}}>
        Datos automáticos desde Copafacil (sin edición manual)
      </div>
    </div>

  </div>
)}