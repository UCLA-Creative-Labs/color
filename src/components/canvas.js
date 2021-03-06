import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import Tone from "tone";
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom";

// window dimensions
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let curr_color;

// tone.js
// note scale must be backwards
const note_duration = "4n";
const scale = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];

var lines = []; // all lines
var line_count = []; // stores number of lines for every stroke
let temp_line = []; // stores last 'undo' line
var lc = 0; // line count for current stroke
var sc = 0; // stroke count
var redo_possible = false; // determines if possible to redo or not
var currentEvent, prevEvent;
var movement_x,
  movement_y,
  movement = 5; // base stroke width is 5
var mu = false; //mouse up

let instrument = "";

//for saving sounds
let s_synthArray = [];  //hold synthesizers
let e_synthArray = [];
let s_freqArray = []; //holds notes played for start sound
let e_freqArray = []; //holds notes played for end sound
let s_tempSynth;
let e_tempSynth;
let temp_s_freq;
let temp_e_freq;
let it = 0;
let curr_playing = false;
let play_length = 0;

//for playback animation
let pb_it = 0;
let pb_sc = 0;

document.documentElement.onmousemove = function(event) {
  currentEvent = event;
};

setInterval(function() {
  if (currentEvent && prevEvent) {
    movement_x = Math.abs(currentEvent.screenX - prevEvent.screenX);
    movement_y = Math.abs(currentEvent.screenY - prevEvent.screenY);
    movement =
      (movement * 10 +
        5 +
        Math.sqrt(Math.pow(movement_x, 2) + Math.pow(movement_y, 2))) /
      11;
    // movement is the "smoothed" velocity of the mouse (takes average of 10 * past velocity and current velocity)
    // determines thickness of stroke
  }
  prevEvent = currentEvent;
}, 5);

//
// Point class
//
function Point(x, y) {
  // constructor
  this.X = x;
  this.Y = y;
}
//
// Rectangle class
//
function Rectangle(x, y, width, height) {
  // constructor
  this.X = x;
  this.Y = y;
  this.Width = width;
  this.Height = height;
}
//
// Unistroke class: a unistroke template
//
function Unistroke(name, points) {
  // constructor
  this.Name = name;
  this.Points = Resample(points, NumPoints);
  var radians = IndicativeAngle(this.Points);
  this.Points = RotateBy(this.Points, -radians);
  this.Points = ScaleTo(this.Points, SquareSize);
  this.Points = TranslateTo(this.Points, Origin);
  this.Vector = Vectorize(this.Points); // for Protractor
}
//
// Result class
//
function Result(name, score, ms) {
  // constructor
  this.Name = name;
  this.Score = score;
  this.Time = ms;
}
//
// DollarRecognizer constants
//
const NumUnistrokes = 16;
const NumPoints = 64;
const SquareSize = 250.0;
const Origin = new Point(0, 0);
const Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
const HalfDiagonal = 0.5 * Diagonal;
const AngleRange = Deg2Rad(45.0);
const AnglePrecision = Deg2Rad(2.0);
const Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio
//
// DollarRecognizer class
//
function DollarRecognizer() {
  // constructor
  //
  // one built-in unistroke per gesture type
  //
  this.Unistrokes = new Array(NumUnistrokes);
  this.Unistrokes[0] = new Unistroke(
    "triangle",
    new Array(
      new Point(137, 139),
      new Point(135, 141),
      new Point(133, 144),
      new Point(132, 146),
      new Point(130, 149),
      new Point(128, 151),
      new Point(126, 155),
      new Point(123, 160),
      new Point(120, 166),
      new Point(116, 171),
      new Point(112, 177),
      new Point(107, 183),
      new Point(102, 188),
      new Point(100, 191),
      new Point(95, 195),
      new Point(90, 199),
      new Point(86, 203),
      new Point(82, 206),
      new Point(80, 209),
      new Point(75, 213),
      new Point(73, 213),
      new Point(70, 216),
      new Point(67, 219),
      new Point(64, 221),
      new Point(61, 223),
      new Point(60, 225),
      new Point(62, 226),
      new Point(65, 225),
      new Point(67, 226),
      new Point(74, 226),
      new Point(77, 227),
      new Point(85, 229),
      new Point(91, 230),
      new Point(99, 231),
      new Point(108, 232),
      new Point(116, 233),
      new Point(125, 233),
      new Point(134, 234),
      new Point(145, 233),
      new Point(153, 232),
      new Point(160, 233),
      new Point(170, 234),
      new Point(177, 235),
      new Point(179, 236),
      new Point(186, 237),
      new Point(193, 238),
      new Point(198, 239),
      new Point(200, 237),
      new Point(202, 239),
      new Point(204, 238),
      new Point(206, 234),
      new Point(205, 230),
      new Point(202, 222),
      new Point(197, 216),
      new Point(192, 207),
      new Point(186, 198),
      new Point(179, 189),
      new Point(174, 183),
      new Point(170, 178),
      new Point(164, 171),
      new Point(161, 168),
      new Point(154, 160),
      new Point(148, 155),
      new Point(143, 150),
      new Point(138, 148),
      new Point(136, 148)
    )
  );
  this.Unistrokes[1] = new Unistroke(
    "x",
    new Array(
      new Point(87, 142),
      new Point(89, 145),
      new Point(91, 148),
      new Point(93, 151),
      new Point(96, 155),
      new Point(98, 157),
      new Point(100, 160),
      new Point(102, 162),
      new Point(106, 167),
      new Point(108, 169),
      new Point(110, 171),
      new Point(115, 177),
      new Point(119, 183),
      new Point(123, 189),
      new Point(127, 193),
      new Point(129, 196),
      new Point(133, 200),
      new Point(137, 206),
      new Point(140, 209),
      new Point(143, 212),
      new Point(146, 215),
      new Point(151, 220),
      new Point(153, 222),
      new Point(155, 223),
      new Point(157, 225),
      new Point(158, 223),
      new Point(157, 218),
      new Point(155, 211),
      new Point(154, 208),
      new Point(152, 200),
      new Point(150, 189),
      new Point(148, 179),
      new Point(147, 170),
      new Point(147, 158),
      new Point(147, 148),
      new Point(147, 141),
      new Point(147, 136),
      new Point(144, 135),
      new Point(142, 137),
      new Point(140, 139),
      new Point(135, 145),
      new Point(131, 152),
      new Point(124, 163),
      new Point(116, 177),
      new Point(108, 191),
      new Point(100, 206),
      new Point(94, 217),
      new Point(91, 222),
      new Point(89, 225),
      new Point(87, 226),
      new Point(87, 224)
    )
  );
  this.Unistrokes[2] = new Unistroke(
    "rectangle",
    new Array(
      new Point(78, 149),
      new Point(78, 153),
      new Point(78, 157),
      new Point(78, 160),
      new Point(79, 162),
      new Point(79, 164),
      new Point(79, 167),
      new Point(79, 169),
      new Point(79, 173),
      new Point(79, 178),
      new Point(79, 183),
      new Point(80, 189),
      new Point(80, 193),
      new Point(80, 198),
      new Point(80, 202),
      new Point(81, 208),
      new Point(81, 210),
      new Point(81, 216),
      new Point(82, 222),
      new Point(82, 224),
      new Point(82, 227),
      new Point(83, 229),
      new Point(83, 231),
      new Point(85, 230),
      new Point(88, 232),
      new Point(90, 233),
      new Point(92, 232),
      new Point(94, 233),
      new Point(99, 232),
      new Point(102, 233),
      new Point(106, 233),
      new Point(109, 234),
      new Point(117, 235),
      new Point(123, 236),
      new Point(126, 236),
      new Point(135, 237),
      new Point(142, 238),
      new Point(145, 238),
      new Point(152, 238),
      new Point(154, 239),
      new Point(165, 238),
      new Point(174, 237),
      new Point(179, 236),
      new Point(186, 235),
      new Point(191, 235),
      new Point(195, 233),
      new Point(197, 233),
      new Point(200, 233),
      new Point(201, 235),
      new Point(201, 233),
      new Point(199, 231),
      new Point(198, 226),
      new Point(198, 220),
      new Point(196, 207),
      new Point(195, 195),
      new Point(195, 181),
      new Point(195, 173),
      new Point(195, 163),
      new Point(194, 155),
      new Point(192, 145),
      new Point(192, 143),
      new Point(192, 138),
      new Point(191, 135),
      new Point(191, 133),
      new Point(191, 130),
      new Point(190, 128),
      new Point(188, 129),
      new Point(186, 129),
      new Point(181, 132),
      new Point(173, 131),
      new Point(162, 131),
      new Point(151, 132),
      new Point(149, 132),
      new Point(138, 132),
      new Point(136, 132),
      new Point(122, 131),
      new Point(120, 131),
      new Point(109, 130),
      new Point(107, 130),
      new Point(90, 132),
      new Point(81, 133),
      new Point(76, 133)
    )
  );
  this.Unistrokes[3] = new Unistroke(
    "circle",
    new Array(
      new Point(127, 141),
      new Point(124, 140),
      new Point(120, 139),
      new Point(118, 139),
      new Point(116, 139),
      new Point(111, 140),
      new Point(109, 141),
      new Point(104, 144),
      new Point(100, 147),
      new Point(96, 152),
      new Point(93, 157),
      new Point(90, 163),
      new Point(87, 169),
      new Point(85, 175),
      new Point(83, 181),
      new Point(82, 190),
      new Point(82, 195),
      new Point(83, 200),
      new Point(84, 205),
      new Point(88, 213),
      new Point(91, 216),
      new Point(96, 219),
      new Point(103, 222),
      new Point(108, 224),
      new Point(111, 224),
      new Point(120, 224),
      new Point(133, 223),
      new Point(142, 222),
      new Point(152, 218),
      new Point(160, 214),
      new Point(167, 210),
      new Point(173, 204),
      new Point(178, 198),
      new Point(179, 196),
      new Point(182, 188),
      new Point(182, 177),
      new Point(178, 167),
      new Point(170, 150),
      new Point(163, 138),
      new Point(152, 130),
      new Point(143, 129),
      new Point(140, 131),
      new Point(129, 136),
      new Point(126, 139)
    )
  );
  this.Unistrokes[4] = new Unistroke(
    "check",
    new Array(
      new Point(91, 185),
      new Point(93, 185),
      new Point(95, 185),
      new Point(97, 185),
      new Point(100, 188),
      new Point(102, 189),
      new Point(104, 190),
      new Point(106, 193),
      new Point(108, 195),
      new Point(110, 198),
      new Point(112, 201),
      new Point(114, 204),
      new Point(115, 207),
      new Point(117, 210),
      new Point(118, 212),
      new Point(120, 214),
      new Point(121, 217),
      new Point(122, 219),
      new Point(123, 222),
      new Point(124, 224),
      new Point(126, 226),
      new Point(127, 229),
      new Point(129, 231),
      new Point(130, 233),
      new Point(129, 231),
      new Point(129, 228),
      new Point(129, 226),
      new Point(129, 224),
      new Point(129, 221),
      new Point(129, 218),
      new Point(129, 212),
      new Point(129, 208),
      new Point(130, 198),
      new Point(132, 189),
      new Point(134, 182),
      new Point(137, 173),
      new Point(143, 164),
      new Point(147, 157),
      new Point(151, 151),
      new Point(155, 144),
      new Point(161, 137),
      new Point(165, 131),
      new Point(171, 122),
      new Point(174, 118),
      new Point(176, 114),
      new Point(177, 112),
      new Point(177, 114),
      new Point(175, 116),
      new Point(173, 118)
    )
  );
  this.Unistrokes[5] = new Unistroke(
    "caret",
    new Array(
      new Point(79, 245),
      new Point(79, 242),
      new Point(79, 239),
      new Point(80, 237),
      new Point(80, 234),
      new Point(81, 232),
      new Point(82, 230),
      new Point(84, 224),
      new Point(86, 220),
      new Point(86, 218),
      new Point(87, 216),
      new Point(88, 213),
      new Point(90, 207),
      new Point(91, 202),
      new Point(92, 200),
      new Point(93, 194),
      new Point(94, 192),
      new Point(96, 189),
      new Point(97, 186),
      new Point(100, 179),
      new Point(102, 173),
      new Point(105, 165),
      new Point(107, 160),
      new Point(109, 158),
      new Point(112, 151),
      new Point(115, 144),
      new Point(117, 139),
      new Point(119, 136),
      new Point(119, 134),
      new Point(120, 132),
      new Point(121, 129),
      new Point(122, 127),
      new Point(124, 125),
      new Point(126, 124),
      new Point(129, 125),
      new Point(131, 127),
      new Point(132, 130),
      new Point(136, 139),
      new Point(141, 154),
      new Point(145, 166),
      new Point(151, 182),
      new Point(156, 193),
      new Point(157, 196),
      new Point(161, 209),
      new Point(162, 211),
      new Point(167, 223),
      new Point(169, 229),
      new Point(170, 231),
      new Point(173, 237),
      new Point(176, 242),
      new Point(177, 244),
      new Point(179, 250),
      new Point(181, 255),
      new Point(182, 257)
    )
  );
  this.Unistrokes[6] = new Unistroke(
    "zig-zag",
    new Array(
      new Point(307, 216),
      new Point(333, 186),
      new Point(356, 215),
      new Point(375, 186),
      new Point(399, 216),
      new Point(418, 186)
    )
  );
  this.Unistrokes[7] = new Unistroke(
    "arrow",
    new Array(
      new Point(68, 222),
      new Point(70, 220),
      new Point(73, 218),
      new Point(75, 217),
      new Point(77, 215),
      new Point(80, 213),
      new Point(82, 212),
      new Point(84, 210),
      new Point(87, 209),
      new Point(89, 208),
      new Point(92, 206),
      new Point(95, 204),
      new Point(101, 201),
      new Point(106, 198),
      new Point(112, 194),
      new Point(118, 191),
      new Point(124, 187),
      new Point(127, 186),
      new Point(132, 183),
      new Point(138, 181),
      new Point(141, 180),
      new Point(146, 178),
      new Point(154, 173),
      new Point(159, 171),
      new Point(161, 170),
      new Point(166, 167),
      new Point(168, 167),
      new Point(171, 166),
      new Point(174, 164),
      new Point(177, 162),
      new Point(180, 160),
      new Point(182, 158),
      new Point(183, 156),
      new Point(181, 154),
      new Point(178, 153),
      new Point(171, 153),
      new Point(164, 153),
      new Point(160, 153),
      new Point(150, 154),
      new Point(147, 155),
      new Point(141, 157),
      new Point(137, 158),
      new Point(135, 158),
      new Point(137, 158),
      new Point(140, 157),
      new Point(143, 156),
      new Point(151, 154),
      new Point(160, 152),
      new Point(170, 149),
      new Point(179, 147),
      new Point(185, 145),
      new Point(192, 144),
      new Point(196, 144),
      new Point(198, 144),
      new Point(200, 144),
      new Point(201, 147),
      new Point(199, 149),
      new Point(194, 157),
      new Point(191, 160),
      new Point(186, 167),
      new Point(180, 176),
      new Point(177, 179),
      new Point(171, 187),
      new Point(169, 189),
      new Point(165, 194),
      new Point(164, 196)
    )
  );
  this.Unistrokes[8] = new Unistroke(
    "left square bracket",
    new Array(
      new Point(140, 124),
      new Point(138, 123),
      new Point(135, 122),
      new Point(133, 123),
      new Point(130, 123),
      new Point(128, 124),
      new Point(125, 125),
      new Point(122, 124),
      new Point(120, 124),
      new Point(118, 124),
      new Point(116, 125),
      new Point(113, 125),
      new Point(111, 125),
      new Point(108, 124),
      new Point(106, 125),
      new Point(104, 125),
      new Point(102, 124),
      new Point(100, 123),
      new Point(98, 123),
      new Point(95, 124),
      new Point(93, 123),
      new Point(90, 124),
      new Point(88, 124),
      new Point(85, 125),
      new Point(83, 126),
      new Point(81, 127),
      new Point(81, 129),
      new Point(82, 131),
      new Point(82, 134),
      new Point(83, 138),
      new Point(84, 141),
      new Point(84, 144),
      new Point(85, 148),
      new Point(85, 151),
      new Point(86, 156),
      new Point(86, 160),
      new Point(86, 164),
      new Point(86, 168),
      new Point(87, 171),
      new Point(87, 175),
      new Point(87, 179),
      new Point(87, 182),
      new Point(87, 186),
      new Point(88, 188),
      new Point(88, 195),
      new Point(88, 198),
      new Point(88, 201),
      new Point(88, 207),
      new Point(89, 211),
      new Point(89, 213),
      new Point(89, 217),
      new Point(89, 222),
      new Point(88, 225),
      new Point(88, 229),
      new Point(88, 231),
      new Point(88, 233),
      new Point(88, 235),
      new Point(89, 237),
      new Point(89, 240),
      new Point(89, 242),
      new Point(91, 241),
      new Point(94, 241),
      new Point(96, 240),
      new Point(98, 239),
      new Point(105, 240),
      new Point(109, 240),
      new Point(113, 239),
      new Point(116, 240),
      new Point(121, 239),
      new Point(130, 240),
      new Point(136, 237),
      new Point(139, 237),
      new Point(144, 238),
      new Point(151, 237),
      new Point(157, 236),
      new Point(159, 237)
    )
  );
  this.Unistrokes[9] = new Unistroke(
    "right square bracket",
    new Array(
      new Point(112, 138),
      new Point(112, 136),
      new Point(115, 136),
      new Point(118, 137),
      new Point(120, 136),
      new Point(123, 136),
      new Point(125, 136),
      new Point(128, 136),
      new Point(131, 136),
      new Point(134, 135),
      new Point(137, 135),
      new Point(140, 134),
      new Point(143, 133),
      new Point(145, 132),
      new Point(147, 132),
      new Point(149, 132),
      new Point(152, 132),
      new Point(153, 134),
      new Point(154, 137),
      new Point(155, 141),
      new Point(156, 144),
      new Point(157, 152),
      new Point(158, 161),
      new Point(160, 170),
      new Point(162, 182),
      new Point(164, 192),
      new Point(166, 200),
      new Point(167, 209),
      new Point(168, 214),
      new Point(168, 216),
      new Point(169, 221),
      new Point(169, 223),
      new Point(169, 228),
      new Point(169, 231),
      new Point(166, 233),
      new Point(164, 234),
      new Point(161, 235),
      new Point(155, 236),
      new Point(147, 235),
      new Point(140, 233),
      new Point(131, 233),
      new Point(124, 233),
      new Point(117, 235),
      new Point(114, 238),
      new Point(112, 238)
    )
  );
  this.Unistrokes[10] = new Unistroke(
    "v",
    new Array(
      new Point(89, 164),
      new Point(90, 162),
      new Point(92, 162),
      new Point(94, 164),
      new Point(95, 166),
      new Point(96, 169),
      new Point(97, 171),
      new Point(99, 175),
      new Point(101, 178),
      new Point(103, 182),
      new Point(106, 189),
      new Point(108, 194),
      new Point(111, 199),
      new Point(114, 204),
      new Point(117, 209),
      new Point(119, 214),
      new Point(122, 218),
      new Point(124, 222),
      new Point(126, 225),
      new Point(128, 228),
      new Point(130, 229),
      new Point(133, 233),
      new Point(134, 236),
      new Point(136, 239),
      new Point(138, 240),
      new Point(139, 242),
      new Point(140, 244),
      new Point(142, 242),
      new Point(142, 240),
      new Point(142, 237),
      new Point(143, 235),
      new Point(143, 233),
      new Point(145, 229),
      new Point(146, 226),
      new Point(148, 217),
      new Point(149, 208),
      new Point(149, 205),
      new Point(151, 196),
      new Point(151, 193),
      new Point(153, 182),
      new Point(155, 172),
      new Point(157, 165),
      new Point(159, 160),
      new Point(162, 155),
      new Point(164, 150),
      new Point(165, 148),
      new Point(166, 146)
    )
  );
  this.Unistrokes[11] = new Unistroke(
    "delete",
    new Array(
      new Point(123, 129),
      new Point(123, 131),
      new Point(124, 133),
      new Point(125, 136),
      new Point(127, 140),
      new Point(129, 142),
      new Point(133, 148),
      new Point(137, 154),
      new Point(143, 158),
      new Point(145, 161),
      new Point(148, 164),
      new Point(153, 170),
      new Point(158, 176),
      new Point(160, 178),
      new Point(164, 183),
      new Point(168, 188),
      new Point(171, 191),
      new Point(175, 196),
      new Point(178, 200),
      new Point(180, 202),
      new Point(181, 205),
      new Point(184, 208),
      new Point(186, 210),
      new Point(187, 213),
      new Point(188, 215),
      new Point(186, 212),
      new Point(183, 211),
      new Point(177, 208),
      new Point(169, 206),
      new Point(162, 205),
      new Point(154, 207),
      new Point(145, 209),
      new Point(137, 210),
      new Point(129, 214),
      new Point(122, 217),
      new Point(118, 218),
      new Point(111, 221),
      new Point(109, 222),
      new Point(110, 219),
      new Point(112, 217),
      new Point(118, 209),
      new Point(120, 207),
      new Point(128, 196),
      new Point(135, 187),
      new Point(138, 183),
      new Point(148, 167),
      new Point(157, 153),
      new Point(163, 145),
      new Point(165, 142),
      new Point(172, 133),
      new Point(177, 127),
      new Point(179, 127),
      new Point(180, 125)
    )
  );
  this.Unistrokes[12] = new Unistroke(
    "left curly brace",
    new Array(
      new Point(150, 116),
      new Point(147, 117),
      new Point(145, 116),
      new Point(142, 116),
      new Point(139, 117),
      new Point(136, 117),
      new Point(133, 118),
      new Point(129, 121),
      new Point(126, 122),
      new Point(123, 123),
      new Point(120, 125),
      new Point(118, 127),
      new Point(115, 128),
      new Point(113, 129),
      new Point(112, 131),
      new Point(113, 134),
      new Point(115, 134),
      new Point(117, 135),
      new Point(120, 135),
      new Point(123, 137),
      new Point(126, 138),
      new Point(129, 140),
      new Point(135, 143),
      new Point(137, 144),
      new Point(139, 147),
      new Point(141, 149),
      new Point(140, 152),
      new Point(139, 155),
      new Point(134, 159),
      new Point(131, 161),
      new Point(124, 166),
      new Point(121, 166),
      new Point(117, 166),
      new Point(114, 167),
      new Point(112, 166),
      new Point(114, 164),
      new Point(116, 163),
      new Point(118, 163),
      new Point(120, 162),
      new Point(122, 163),
      new Point(125, 164),
      new Point(127, 165),
      new Point(129, 166),
      new Point(130, 168),
      new Point(129, 171),
      new Point(127, 175),
      new Point(125, 179),
      new Point(123, 184),
      new Point(121, 190),
      new Point(120, 194),
      new Point(119, 199),
      new Point(120, 202),
      new Point(123, 207),
      new Point(127, 211),
      new Point(133, 215),
      new Point(142, 219),
      new Point(148, 220),
      new Point(151, 221)
    )
  );
  this.Unistrokes[13] = new Unistroke(
    "right curly brace",
    new Array(
      new Point(117, 132),
      new Point(115, 132),
      new Point(115, 129),
      new Point(117, 129),
      new Point(119, 128),
      new Point(122, 127),
      new Point(125, 127),
      new Point(127, 127),
      new Point(130, 127),
      new Point(133, 129),
      new Point(136, 129),
      new Point(138, 130),
      new Point(140, 131),
      new Point(143, 134),
      new Point(144, 136),
      new Point(145, 139),
      new Point(145, 142),
      new Point(145, 145),
      new Point(145, 147),
      new Point(145, 149),
      new Point(144, 152),
      new Point(142, 157),
      new Point(141, 160),
      new Point(139, 163),
      new Point(137, 166),
      new Point(135, 167),
      new Point(133, 169),
      new Point(131, 172),
      new Point(128, 173),
      new Point(126, 176),
      new Point(125, 178),
      new Point(125, 180),
      new Point(125, 182),
      new Point(126, 184),
      new Point(128, 187),
      new Point(130, 187),
      new Point(132, 188),
      new Point(135, 189),
      new Point(140, 189),
      new Point(145, 189),
      new Point(150, 187),
      new Point(155, 186),
      new Point(157, 185),
      new Point(159, 184),
      new Point(156, 185),
      new Point(154, 185),
      new Point(149, 185),
      new Point(145, 187),
      new Point(141, 188),
      new Point(136, 191),
      new Point(134, 191),
      new Point(131, 192),
      new Point(129, 193),
      new Point(129, 195),
      new Point(129, 197),
      new Point(131, 200),
      new Point(133, 202),
      new Point(136, 206),
      new Point(139, 211),
      new Point(142, 215),
      new Point(145, 220),
      new Point(147, 225),
      new Point(148, 231),
      new Point(147, 239),
      new Point(144, 244),
      new Point(139, 248),
      new Point(134, 250),
      new Point(126, 253),
      new Point(119, 253),
      new Point(115, 253)
    )
  );
  this.Unistrokes[14] = new Unistroke(
    "star",
    new Array(
      new Point(75, 250),
      new Point(75, 247),
      new Point(77, 244),
      new Point(78, 242),
      new Point(79, 239),
      new Point(80, 237),
      new Point(82, 234),
      new Point(82, 232),
      new Point(84, 229),
      new Point(85, 225),
      new Point(87, 222),
      new Point(88, 219),
      new Point(89, 216),
      new Point(91, 212),
      new Point(92, 208),
      new Point(94, 204),
      new Point(95, 201),
      new Point(96, 196),
      new Point(97, 194),
      new Point(98, 191),
      new Point(100, 185),
      new Point(102, 178),
      new Point(104, 173),
      new Point(104, 171),
      new Point(105, 164),
      new Point(106, 158),
      new Point(107, 156),
      new Point(107, 152),
      new Point(108, 145),
      new Point(109, 141),
      new Point(110, 139),
      new Point(112, 133),
      new Point(113, 131),
      new Point(116, 127),
      new Point(117, 125),
      new Point(119, 122),
      new Point(121, 121),
      new Point(123, 120),
      new Point(125, 122),
      new Point(125, 125),
      new Point(127, 130),
      new Point(128, 133),
      new Point(131, 143),
      new Point(136, 153),
      new Point(140, 163),
      new Point(144, 172),
      new Point(145, 175),
      new Point(151, 189),
      new Point(156, 201),
      new Point(161, 213),
      new Point(166, 225),
      new Point(169, 233),
      new Point(171, 236),
      new Point(174, 243),
      new Point(177, 247),
      new Point(178, 249),
      new Point(179, 251),
      new Point(180, 253),
      new Point(180, 255),
      new Point(179, 257),
      new Point(177, 257),
      new Point(174, 255),
      new Point(169, 250),
      new Point(164, 247),
      new Point(160, 245),
      new Point(149, 238),
      new Point(138, 230),
      new Point(127, 221),
      new Point(124, 220),
      new Point(112, 212),
      new Point(110, 210),
      new Point(96, 201),
      new Point(84, 195),
      new Point(74, 190),
      new Point(64, 182),
      new Point(55, 175),
      new Point(51, 172),
      new Point(49, 170),
      new Point(51, 169),
      new Point(56, 169),
      new Point(66, 169),
      new Point(78, 168),
      new Point(92, 166),
      new Point(107, 164),
      new Point(123, 161),
      new Point(140, 162),
      new Point(156, 162),
      new Point(171, 160),
      new Point(173, 160),
      new Point(186, 160),
      new Point(195, 160),
      new Point(198, 161),
      new Point(203, 163),
      new Point(208, 163),
      new Point(206, 164),
      new Point(200, 167),
      new Point(187, 172),
      new Point(174, 179),
      new Point(172, 181),
      new Point(153, 192),
      new Point(137, 201),
      new Point(123, 211),
      new Point(112, 220),
      new Point(99, 229),
      new Point(90, 237),
      new Point(80, 244),
      new Point(73, 250),
      new Point(69, 254),
      new Point(69, 252)
    )
  );
  this.Unistrokes[15] = new Unistroke(
    "pigtail",
    new Array(
      new Point(81, 219),
      new Point(84, 218),
      new Point(86, 220),
      new Point(88, 220),
      new Point(90, 220),
      new Point(92, 219),
      new Point(95, 220),
      new Point(97, 219),
      new Point(99, 220),
      new Point(102, 218),
      new Point(105, 217),
      new Point(107, 216),
      new Point(110, 216),
      new Point(113, 214),
      new Point(116, 212),
      new Point(118, 210),
      new Point(121, 208),
      new Point(124, 205),
      new Point(126, 202),
      new Point(129, 199),
      new Point(132, 196),
      new Point(136, 191),
      new Point(139, 187),
      new Point(142, 182),
      new Point(144, 179),
      new Point(146, 174),
      new Point(148, 170),
      new Point(149, 168),
      new Point(151, 162),
      new Point(152, 160),
      new Point(152, 157),
      new Point(152, 155),
      new Point(152, 151),
      new Point(152, 149),
      new Point(152, 146),
      new Point(149, 142),
      new Point(148, 139),
      new Point(145, 137),
      new Point(141, 135),
      new Point(139, 135),
      new Point(134, 136),
      new Point(130, 140),
      new Point(128, 142),
      new Point(126, 145),
      new Point(122, 150),
      new Point(119, 158),
      new Point(117, 163),
      new Point(115, 170),
      new Point(114, 175),
      new Point(117, 184),
      new Point(120, 190),
      new Point(125, 199),
      new Point(129, 203),
      new Point(133, 208),
      new Point(138, 213),
      new Point(145, 215),
      new Point(155, 218),
      new Point(164, 219),
      new Point(166, 219),
      new Point(177, 219),
      new Point(182, 218),
      new Point(192, 216),
      new Point(196, 213),
      new Point(199, 212),
      new Point(201, 211)
    )
  );
  //
  // The $1 Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
  //
  this.Recognize = function(points, useProtractor) {
    var t0 = Date.now();
    points = Resample(points, NumPoints);
    var radians = IndicativeAngle(points);
    points = RotateBy(points, -radians);
    points = ScaleTo(points, SquareSize);
    points = TranslateTo(points, Origin);
    var vector = Vectorize(points); // for Protractor

    var b = +Infinity;
    var u = -1;
    for (
      var i = 0;
      i < this.Unistrokes.length;
      i++ // for each unistroke
    ) {
      var d;
      if (useProtractor)
        // for Protractor
        d = OptimalCosineDistance(this.Unistrokes[i].Vector, vector);
      // Golden Section Search (original $1)
      else
        d = DistanceAtBestAngle(
          points,
          this.Unistrokes[i],
          -AngleRange,
          +AngleRange,
          AnglePrecision
        );
      if (d < b) {
        b = d; // best (least) distance
        u = i; // unistroke index
      }
    }
    var t1 = Date.now();
    return u === -1
      ? new Result("No match.", 0.0, t1 - t0)
      : new Result(
          this.Unistrokes[u].Name,
          useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal,
          t1 - t0
        );
  };
  this.AddGesture = function(name, points) {
    this.Unistrokes[this.Unistrokes.length] = new Unistroke(name, points); // append new unistroke
    var num = 0;
    for (var i = 0; i < this.Unistrokes.length; i++) {
      if (this.Unistrokes[i].Name === name) num++;
    }
    return num;
  };
  this.DeleteUserGestures = function() {
    this.Unistrokes.length = NumUnistrokes; // clear any beyond the original set
    return NumUnistrokes;
  };
}
//
// Private helper functions from here on down
//
function Resample(points, n) {
  var I = PathLength(points) / (n - 1); // interval length
  var D = 0.0;
  var newpoints = new Array(points[0]);
  for (var i = 1; i < points.length; i++) {
    var d = Distance(points[i - 1], points[i]);
    if (D + d >= I) {
      var qx =
        points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
      var qy =
        points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
      var q = new Point(qx, qy);
      newpoints[newpoints.length] = q; // append new point 'q'
      points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
      D = 0.0;
    } else D += d;
  }
  if (newpoints.length === n - 1)
    // somtimes we fall a rounding-error short of adding the last point, so add it if so
    newpoints[newpoints.length] = new Point(
      points[points.length - 1].X,
      points[points.length - 1].Y
    );
  return newpoints;
}
function IndicativeAngle(points) {
  var c = Centroid(points);
  return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
}
function RotateBy(points, radians) {
  // rotates points around centroid
  var c = Centroid(points);
  var cos = Math.cos(radians);
  var sin = Math.sin(radians);
  var newpoints = new Array();
  for (var i = 0; i < points.length; i++) {
    var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X;
    var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
    newpoints[newpoints.length] = new Point(qx, qy);
  }
  return newpoints;
}
function ScaleTo(points, size) {
  // non-uniform scale; assumes 2D gestures (i.e., no lines)
  var B = BoundingBox(points);
  var newpoints = new Array();
  for (var i = 0; i < points.length; i++) {
    var qx = points[i].X * (size / B.Width);
    var qy = points[i].Y * (size / B.Height);
    newpoints[newpoints.length] = new Point(qx, qy);
  }
  return newpoints;
}
function TranslateTo(points, pt) {
  // translates points' centroid
  var c = Centroid(points);
  var newpoints = new Array();
  for (var i = 0; i < points.length; i++) {
    var qx = points[i].X + pt.X - c.X;
    var qy = points[i].Y + pt.Y - c.Y;
    newpoints[newpoints.length] = new Point(qx, qy);
  }
  return newpoints;
}
function Vectorize(points) {
  // for Protractor
  var sum = 0.0;
  var vector = new Array();
  for (var i = 0; i < points.length; i++) {
    vector[vector.length] = points[i].X;
    vector[vector.length] = points[i].Y;
    sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
  }
  var magnitude = Math.sqrt(sum);
  for (var j = 0; j < vector.length; j++) vector[j] /= magnitude;
  return vector;
}
function OptimalCosineDistance(v1, v2) {
  // for Protractor
  var a = 0.0;
  var b = 0.0;
  for (var i = 0; i < v1.length; i += 2) {
    a += v1[i] * v2[i] + v1[i + 1] * v2[i + 1];
    b += v1[i] * v2[i + 1] - v1[i + 1] * v2[i];
  }
  var angle = Math.atan(b / a);
  return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
}
function DistanceAtBestAngle(points, T, a, b, threshold) {
  var x1 = Phi * a + (1.0 - Phi) * b;
  var f1 = DistanceAtAngle(points, T, x1);
  var x2 = (1.0 - Phi) * a + Phi * b;
  var f2 = DistanceAtAngle(points, T, x2);
  while (Math.abs(b - a) > threshold) {
    if (f1 < f2) {
      b = x2;
      x2 = x1;
      f2 = f1;
      x1 = Phi * a + (1.0 - Phi) * b;
      f1 = DistanceAtAngle(points, T, x1);
    } else {
      a = x1;
      x1 = x2;
      f1 = f2;
      x2 = (1.0 - Phi) * a + Phi * b;
      f2 = DistanceAtAngle(points, T, x2);
    }
  }
  return Math.min(f1, f2);
}
function DistanceAtAngle(points, T, radians) {
  var newpoints = RotateBy(points, radians);
  return PathDistance(newpoints, T.Points);
}
function Centroid(points) {
  var x = 0.0,
    y = 0.0;
  for (var i = 0; i < points.length; i++) {
    x += points[i].X;
    y += points[i].Y;
  }
  x /= points.length;
  y /= points.length;
  return new Point(x, y);
}

function BoundingBox(points) {
  var minX = +Infinity,
    maxX = -Infinity,
    minY = +Infinity,
    maxY = -Infinity;
  for (var i = 0; i < points.length; i++) {
    minX = Math.min(minX, points[i].X);
    minY = Math.min(minY, points[i].Y);
    maxX = Math.max(maxX, points[i].X);
    maxY = Math.max(maxY, points[i].Y);
  }
  return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}
function PathDistance(pts1, pts2) {
  var d = 0.0;
  for (
    var i = 0;
    i < pts1.length;
    i++ // assumes pts1.length == pts2.length
  )
    d += Distance(pts1[i], pts2[i]);
  return d / pts1.length;
}
function PathLength(points) {
  var d = 0.0;
  for (var i = 1; i < points.length; i++)
    d += Distance(points[i - 1], points[i]);
  return d;
}
function Distance(p1, p2) {
  var dx = p2.X - p1.X;
  var dy = p2.Y - p1.Y;
  return Math.sqrt(dx * dx + dy * dy);
}
function Deg2Rad(d) {
  return (d * Math.PI) / 180.0;
}

function otherPoint(x, y) {
  // constructor
  this.X = x;
  this.Y = y;
}

function brushStroke(x, y) {
  this.startX = x;
  this.startY = y;
  this.shape = "No Match.";
}

// sketch vars
let points = [];
let strokes = [];
let _r = new DollarRecognizer();
let lilstroke;
let result;
let color_res = 0.9;
let color_freq = 1;
// array of Grid objects
let gridArr = [];
// stroke start location
let stroke_start;
// color schemes
const color_options = {
  scheme_1: ["#94EBD8", "#00B349"],
  scheme_2: ["#983275", "#FF6F01"],
  scheme_3: ["#C3A706", "#329290"]
};

// grid class
class Grid {
  constructor(boundaries, note_freq) {
    this.boundary_xstart = boundaries.xstart;
    this.boundary_xend = boundaries.xend;
    this.boundary_ystart = boundaries.ystart;
    this.boundary_yend = boundaries.yend;
    // sound init
    this.synth = new Tone.PolySynth().toMaster();
    this.note_freq = note_freq;
  }

  check_bound(x, y) {
    return (
      x >= this.boundary_xstart &&
      x <= this.boundary_xend &&
      y >= this.boundary_ystart &&
      y <= this.boundary_yend
    );
  }

  change_instrument(instrument) {
    let piano = new Tone.PolySynth();
    let guitar = new Tone.PluckSynth({ resonance: 0.99 });
    let harmonica = new Tone.FMSynth({ harmonicity: 2 });

    switch (instrument) {
      case "piano":
        this.synth = piano.toMaster();
        break;
      case "guitar":
        this.synth = guitar.toMaster();
        break;
      case "harmonica":
        this.synth = harmonica.toMaster();
        break;
      default:
        this.synth = piano.toMaster();
        break;
    }
  }

  play_sound() {
    this.synth.triggerAttackRelease(this.note_freq, note_duration);
  }
}

const sketch = p5 => {
  p5.setup = () => {
    // create canvas and set default color
    let my_canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    my_canvas.style.display = "block";
    curr_color = p5.color("#000000");

    //initialize Grid objects
    for (let j = 0; j < 8; j++) {
      const g = new Grid(
        {
          xstart: 0,
          xend: windowWidth,
          ystart: (windowHeight * j) / 8,
          yend: (windowHeight * (j + 1)) / 8
        },
        scale[j]
      );
      //push to grid array
      gridArr.push(g);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

	p5.draw = () => {
		p5.clear();
		for (var i = 0; i < lines.length; i++) {
			p5.strokeWeight(lines[i].weight);
      p5.stroke(lines[i].color);
			var mag1 = Math.sqrt(Math.pow(lines[i].x- p5.mouseX,2)+Math.pow(lines[i].y- p5.mouseY,2));
			var mag2 = Math.sqrt(Math.pow(lines[i].px - p5.mouseX,2)+Math.pow(lines[i].py - p5.mouseY,2));
			var mult = 9 + i/10;
			var div1 = 1 + mult + mag1;
			var div2 = 1 + mult + mag2;

			// if the mouse is close to a point of a line, the point will 
			// move be drawn close to the mouse

      p5.line((lines[i].x * (1+mag1) + mult * p5.mouseX) / div1, 
                (lines[i].y * (1+mag1) + mult * p5.mouseY) / div1, 
                (lines[i].px * (1+mag2) + mult * p5.mouseX) / div2, 
                (lines[i].py * (1+mag2) + mult * p5.mouseY) / div2);
		  }
	};

  p5.mousePressed = () => {
    points = [];
    movement_x = 5;
    movement_y = 5;
    movement = 5;
    lilstroke = new brushStroke(p5.mouseX, p5.mouseY);
    // prevX = p5.pmouseX;
    // prevY = p5.pmouseY;

    // store stroke start for playing at end of stroke
    stroke_start = [p5.mouseX, p5.mouseY];
    points = [];
    lilstroke = new brushStroke(p5.mouseX, p5.mouseY);

    mu = false;
    lc = 0;
    redo_possible = false;
  };

  p5.mouseDragged = () => {
    p5.strokeWeight(10);
    p5.stroke(curr_color);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    var currpoint = new otherPoint(p5.mouseX, p5.mouseY);
    points.push(currpoint);
    lines.push(
      new Line(
        p5.mouseX,
        p5.mouseY,
        p5.pmouseX,
        p5.pmouseY,
        movement,
        curr_color
      )
    );
    lc++;
  };

  p5.mouseReleased = () => {
    //strokes.push(points) // dont push strokes here as an array, push the object it gets recognized
    if (points.length > 10) {
      result = _r.Recognize(points);
      lilstroke.shape = result.Name;
    } else {
      lilstroke.shape = "No Match.";
    }

    console.log(lilstroke.shape);
    strokes.push(lilstroke);
    //drawings.push(new Drawing(prevX, prevY, p5.mouseX, p5.mouseY));
    //console.log(drawings);

    line_count[sc] = lc;
    sc++;
    mu = true;
    movement = 5;
    
    let synth = new Tone.PolySynth().toMaster(); //random declaration of synth
    if(lilstroke.shape ==="triangle" || lilstroke.shape === "rectangle" || lilstroke.shape === "circle"){
      let q = 0;
      for (q =lines.length-1; q>lines.length-lc; q--){
        lines[q].weight *=1.25;
      }
      setTimeout(function(){
        console.log(lines[lc-1]);
        for (q =lines.length-1; q>lines.length-lc; q--){
          lines[q].weight /= 1.25; 
        }
      },600);
    }
    if (lilstroke.shape === "triangle") {
      let harmonica = new Tone.FMSynth({ harmonicity: color_freq });
      synth = harmonica.toMaster();
      synth.triggerAttackRelease(scale[7], note_duration);

      s_synthArray.push(synth);
      s_freqArray.push(scale[7]);
      e_synthArray.push(synth);
      e_freqArray.push(scale[7]);
    } else if (lilstroke.shape === "circle") {
      let poly = new Tone.PolySynth();
      synth = poly.toMaster();
      let chord = ["C4", "E4", "G4"]; // c major
      switch (color_freq){
        case 1:
        chord = ["C4", "E4", "G4"]; // c major
        break;
        case 2:
        chord = ["F4", "A4", "C4"];//f major
        break;
        case 3:
        chord = ["G4", "B4", "D4"]; //g major
        break;
        case 4:
        chord = ["A4", "C4", "E4"]; //a minor
        break;
        case 5:
        chord = ["B4", "D4", "F4"]; //b diminshed
        break;
        case 6:
        chord = ["E4", "G4", "B4"];//e minor
        break;
      }
      console.log(chord);
      console.log(color_res);
      synth.triggerAttackRelease(chord, note_duration);

      s_synthArray.push(synth);
      s_freqArray.push(chord);
      e_synthArray.push(synth);
      e_freqArray.push(chord);
    } else if (lilstroke.shape === "rectangle") {
      let guitar = new Tone.PluckSynth({ resonance: color_res });
      synth = guitar.toMaster();
      synth.triggerAttackRelease(scale[5], note_duration);

      s_synthArray.push(synth);
      s_freqArray.push(scale[5]);
      e_synthArray.push(synth);
      e_freqArray.push(scale[5]);
    } else {
      // check stroke click and play both sounds
      gridArr.forEach(element => {

        if (element.check_bound(p5.mouseX, p5.mouseY)) {
          element.play_sound();

          //add synth to array
          e_synthArray.push(element.synth);
          //add frequency to array
          e_freqArray.push(element.note_freq);
          console.log(e_freqArray);
        }
        if (element.check_bound(stroke_start[0], stroke_start[1])) {
          element.play_sound();

          //add synth to array
          s_synthArray.push(element.synth);
          //add frequency to array
          s_freqArray.push(element.note_freq);
          console.log(s_freqArray);
        }
      });
    }
  };

  p5.keyPressed = () => {
    switch (p5.key) {
      case "T":
        curr_color = p5.color(color_options.scheme_1[0]);
        instrument = "piano";
        color_res = 0.9;
        color_freq = 1;
        break;
      case "G":
        curr_color = p5.color(color_options.scheme_1[1]);
        instrument = "piano";
        color_res = 0.92;
        color_freq = 2;
        break;
      case "Y":
        curr_color = p5.color(color_options.scheme_2[0]);
        instrument = "guitar";
        color_res = 0.94;
        color_freq = 3;
        break;
      case "H":
        curr_color = p5.color(color_options.scheme_2[1]);
        instrument = "guitar";
        color_res = 0.96;
        color_freq = 4;
        break;
      case "U":
        curr_color = p5.color(color_options.scheme_3[0]);
        instrument = "harmonica";
        color_res = 0.98;
        color_freq = 5;
        break;
      case "J":
        curr_color = p5.color(color_options.scheme_3[1]);
        instrument = "harmonica";
        color_res = 0.99;
        color_freq = 6;
        break;
      default:
        break;
    }

    for (var k = 0; k < gridArr.length; k++) {
      gridArr[k].change_instrument(instrument);
    }

    // undo
    if ((p5.key === "D" || p5.key === "d") && !curr_playing && it === 0) {
      if (lines.length > 0 && mu) {
        //add deleted lines to deleted_lines array
        temp_line = lines.slice(
          lines.length - line_count[sc - 1],
          lines.length
        ); //store last stroke in temp array
        lines.splice(lines.length - line_count[sc - 1], line_count[sc - 1]); //remove Drawing from array
        sc--;
        redo_possible = true;
        p5.clear();

        //remove sound from synthArray
        s_tempSynth = s_synthArray.pop();
        e_tempSynth = e_synthArray.pop();

        //remove frequencies from both freqArrays
        temp_s_freq = s_freqArray.pop();
        temp_e_freq = e_freqArray.pop();
      }
    }

    // redo
    if ((p5.key === "Q" || p5.key === "q") && !curr_playing) {
      if (redo_possible && mu) {
        lines = lines.concat(temp_line); //add line back to lines array
        redo_possible = false;
        sc++;

        //add back tempSynth
        s_synthArray.push(s_tempSynth);
        e_synthArray.push(s_tempSynth);

        //add back both freqs to freqArrays
        s_freqArray.push(temp_s_freq);
        e_freqArray.push(temp_e_freq);
      }
    }

    // reset
    if ((p5.key === "R" || p5.key === "r") && !curr_playing) {
      // clear the lines array --> remove all drawings from screen
      lines.length = 0;
      lines = []; // all lines
      line_count = []; // stores number of lines for every stroke
      line_count.length = 0;
      temp_line = []; // stores last 'undo' line
      temp_line.length = 0;
      lc = 0; // line count for current stroke
      sc = 0; // stroke count
      redo_possible = false;
      p5.clear();
      // reset color to black (default)
      curr_color = p5.color("#000000");
      instrument = "piano";
      for (var a = 0; a < gridArr.length; a++) {
        gridArr[a].change_instrument(instrument);
      }



      //dealing with playing sounds
      it = 0;
      curr_playing = false;
      s_synthArray = [];
      e_synthArray = [];
      s_freqArray = [];
      e_freqArray = [];
      s_synthArray.length = 0;
      e_synthArray.length = 0;
      s_freqArray.length = 0;
      e_freqArray.length = 0;

      //for playback animation
      pb_start = 0;
      pb_end = 0;
      pb_prev_start = 0;
      pb_prev_end = 0;
    }

    // play sounds
    if (p5.key === " "){
      console.log("playing all sounds");
      if (s_synthArray.length > 0){
        if (!curr_playing){
          play_length = s_synthArray.length;
          pb_end = lines.length;
          if (it !== 0){
            playAllSounds(it+1);
            playbackAnimation(it+1);
          }
          else{
            playAllSounds(it);
            playbackAnimation(it);
          }
        }
        else {
          play_length = 0;
          pb_end = 0;
        }
      }
    }
  };

  function playAllSounds(i){
    setTimeout(function() {
      // checks out of bounds end points
      checkArrayLengths(i);

      //play notes
      e_synthArray[i].triggerAttackRelease(e_freqArray[i], note_duration);
      s_synthArray[i].triggerAttackRelease(s_freqArray[i], note_duration);
      i++;
      if (i < play_length){
        curr_playing = true;
        //end of synthArray, reset it to 0
        if (i === s_synthArray.length-1){
          it = 0;
        }
        else {
          it = i;
        }
        playAllSounds(i);
      }
      else {
        curr_playing = false;
      }
    }, 600);
  }

  let pb_start = 0;
  let pb_end = 0;
  let pb_prev_start = 0;
  let pb_prev_end = 0;
  function playbackAnimation(pb_i){
    setTimeout(function() {
      // pb_start = pb_i;
      console.log(pb_i);

      if (pb_end !== 0 && (pb_start + line_count[pb_i]) <= pb_end){
        if (pb_start !== 0){
          //decrease strokeWeight of previous lines
          for (var j = pb_prev_start; j < pb_prev_end; j++){
            lines[j].weight /= 1.5;
          }
        }

        //increase strokeWeight of lines
        for (var i = pb_start; i < (pb_start + line_count[pb_i]); i++){
          lines[i].weight *= 1.5;
        }

        pb_prev_start = pb_start;
        pb_prev_end = pb_start + line_count[pb_i];

        pb_start += line_count[pb_i];
        // pb_sc++;
        pb_i++;
        if (pb_i >= sc){
          //wait 600 ms then decrease strokeWeight of last stroke
          setTimeout(function(){
            for (var k = pb_prev_start; k < pb_prev_end; k++){
              lines[k].weight /= 1.5;
            }
          },600);
          // pb_sc = 0;
          pb_start = 0;
          console.log("end");
          return;
        }
        else{
          playbackAnimation(pb_i);
        } 
      }
      //add weight to one more stroke
      else{
        if (pb_start !== 0){
          //decrease strokeWeight of previous lines
          for (var j = pb_prev_start; j < pb_prev_end; j++){
            lines[j].weight /= 1.5;
          }
        }

        //increase strokeWeight of lines
        for (var i = pb_start; i < (pb_start + line_count[pb_i]); i++){
          lines[i].weight *= 1.5;
        }

        pb_prev_start = pb_start;
        pb_prev_end = pb_start + line_count[pb_i];

        pb_start += line_count[pb_i];
        // pb_sc++;
        pb_i++;
        if (pb_i >= sc){
          //wait 800 ms then decrease strokeWeight of last stroke
          setTimeout(function(){
            for (var k = pb_prev_start; k < pb_prev_end; k++){
              lines[k].weight /= 1.5;
            }
          },600);
          // pb_sc = 0;
          pb_start = 0;
          console.log("end");
          return;
        }
      } 
    }, 600);
  }

  function checkArrayLengths(i) {
    if (s_synthArray.length !== e_synthArray.length){
      //if end point is out of bounds, just add start synth and freq to end arrays
      e_synthArray.push(s_synthArray[i]);
      e_freqArray.push(s_freqArray[i]);
    }
  }

  function Line(x, y, px, py, weight, color) {
    this.x = x;
    this.y = y;
    this.px = px;
    this.py = py;
    this.weight = weight;
    this.color = color;

    this.drawLine = () => {
      p5.strokeWeight(weight);
      p5.stroke(color);
      p5.line(this.x, this.y, this.px, this.py);
    };
  }
};

// Canvas component
class Canvas extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <P5Wrapper sketch={sketch} />;
  }
}

export default Canvas;
