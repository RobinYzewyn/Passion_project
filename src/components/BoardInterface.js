import { useEffect, useState, useRef } from "react"
import io from "socket.io-client";
import styles from "../styles/Board.module.css";
import boarddesign from "../assets/Board_Design.svg";

import ring from "../assets/gym/ring.svg";
import ring_w from "../assets/gym/ring_w.svg"
import ring_r from "../assets/gym/ring_r.svg";
import ring_g from "../assets/gym/ring_g.svg"
import ring_y from "../assets/gym/ring_y.svg";

import basicfit from "../assets/gym/basicfit.svg"
import oxygen from "../assets/gym/oxygen.svg"

import basicfit_active from "../assets/gym/basicfit_active.svg"
import oxygen_active from "../assets/gym/oxygen_active.svg"

import bankjes_b from "../assets/gym/bankjes_b.svg";
import benchpress_b from "../assets/gym/benchpress_b.svg";
import cables_b from "../assets/gym/cables_b.svg";
import deadlift_b from "../assets/gym/deadlift_b.svg";
import dumbbells_b from "../assets/gym/dumbbells_b.svg";
import gewichten1_b from "../assets/gym/gewichten1_b.svg";
import gewichten2_b from "../assets/gym/gewichten2_b.svg";
import preacher_b from "../assets/gym/preacher_b.svg";
import yogamat_b from "../assets/gym/yogamat_b.svg";
import zak_top_b from "../assets/gym/zak_top_b.svg";
import zak_midden_b from "../assets/gym/zak_midden_b.svg";
import zak_onder_b from "../assets/gym/zak_onder_b.svg";

import bankjes_y from "../assets/gym/bankjes_y.svg";
import benchpress_y from "../assets/gym/benchpress_y.svg";
import cables_y from "../assets/gym/cables_y.svg";
import deadlift_y from "../assets/gym/deadlift_y.svg";
import dumbbells_y from "../assets/gym/dumbbells_y.svg";
import gewichten1_y from "../assets/gym/gewichten1_y.svg";
import gewichten2_y from "../assets/gym/gewichten2_y.svg";
import preacher_y from "../assets/gym/preacher_y.svg";
import yogamat_y from "../assets/gym/yogamat_y.svg";
import zak_top_y from "../assets/gym/zak_top_y.svg";
import zak_midden_y from "../assets/gym/zak_midden_y.svg";
import zak_onder_y from "../assets/gym/zak_onder_y.svg";

import bankjes_r from "../assets/gym/bankjes_r.svg";
import benchpress_r from "../assets/gym/benchpress_r.svg";
import cables_r from "../assets/gym/cables_r.svg";
import deadlift_r from "../assets/gym/deadlift_r.svg";
import dumbbells_r from "../assets/gym/dumbbells_r.svg";
import gewichten1_r from "../assets/gym/gewichten1_r.svg";
import gewichten2_r from "../assets/gym/gewichten2_r.svg";
import preacher_r from "../assets/gym/preacher_r.svg";
import yogamat_r from "../assets/gym/yogamat_r.svg";
import zak_top_r from "../assets/gym/zak_top_r.svg";
import zak_midden_r from "../assets/gym/zak_midden_r.svg";
import zak_onder_r from "../assets/gym/zak_onder_r.svg";

import bankjes_g from "../assets/gym/bankjes_g.svg";
import benchpress_g from "../assets/gym/benchpress_g.svg";
import cables_g from "../assets/gym/cables_g.svg";
import deadlift_g from "../assets/gym/deadlift_g.svg";
import dumbbells_g from "../assets/gym/dumbbells_g.svg";
import gewichten1_g from "../assets/gym/gewichten1_g.svg";
import gewichten2_g from "../assets/gym/gewichten2_g.svg";
import preacher_g from "../assets/gym/preacher_g.svg";
import yogamat_g from "../assets/gym/yogamat_g.svg";
import zak_top_g from "../assets/gym/zak_top_g.svg";
import zak_midden_g from "../assets/gym/zak_midden_g.svg";
import zak_onder_g from "../assets/gym/zak_onder_g.svg";

import bankjes_w from "../assets/gym/bankjes_w.svg";
import benchpress_w from "../assets/gym/benchpress_w.svg";
import cables_w from "../assets/gym/cables_w.svg";
import deadlift_w from "../assets/gym/deadlift_w.svg";
import dumbbells_w from "../assets/gym/dumbbells_w.svg";
import gewichten1_w from "../assets/gym/gewichten1_w.svg";
import gewichten2_w from "../assets/gym/gewichten2_w.svg";
import preacher_w from "../assets/gym/preacher_w.svg";
import yogamat_w from "../assets/gym/yogamat_w.svg";
import zak_top_w from "../assets/gym/zak_top_w.svg";
import zak_midden_w from "../assets/gym/zak_midden_w.svg";
import zak_onder_w from "../assets/gym/zak_onder_w.svg";

import board_start from "../assets/board_start.svg";
import board_restday from "../assets/board_restday.svg";
import board_tojail from "../assets/board_tojail.svg";

import stylesDesign from "../styles/BoardDesign.module.css";
import kettlebell from "../assets/kettlebell.svg"
import moneybag from "../assets/moneybag.svg";
import station from "../assets/station.svg";
import board_jail from "../assets/jail.svg";
import board_bed from "../assets/board_bed.svg";

import nxtP0 from "../assets/NEXT/Player0.json";
import nxtP1 from "../assets/NEXT/Player1.json";
import nxtP2 from "../assets/NEXT/Player2.json";
import nxtP3 from "../assets/NEXT/Player3.json";

import DiceTop_1 from "../assets/dice_board/DiceTop_1.json";
import DiceTop_2 from "../assets/dice_board/DiceTop_2.json";
import DiceTop_3 from "../assets/dice_board/DiceTop_3.json";
import DiceTop_4 from "../assets/dice_board/DiceTop_4.json";
import DiceTop_5 from "../assets/dice_board/DiceTop_5.json";
import DiceTop_6 from "../assets/dice_board/DiceTop_6.json";

import JailFalling from "../assets/JailFalling.json";

import MoneyRain from "../assets/_money-confetti.json";

import Lottie from 'react-lottie';

import CardDone from "../assets/Sounds/mixkit-winning-a-coin-video-game-2069.wav";
import EndGame from "../assets/Sounds/mixkit-completion-of-a-level-2063.wav";
import PlayerReceivesMoney from "../assets/Sounds/mixkit-winning-an-extra-bonus-2060.wav";
import PlayerPaysMoney from "../assets/Sounds/mixkit-unlock-new-item-game-notification-254.wav";
import PlayerJoins from "../assets/Sounds/mixkit-arcade-retro-changing-tab-206.wav";
import SoldProperty from "../assets/Sounds/mixkit-player-losing-or-failing-2042.wav";
import ComesMoney from "../assets/Sounds/Here-comes-the-money.mp3";
import JailDoor from "../assets/Sounds/JailDoor.mp3";
import MultiPlayer from "./Multiplayer";

let socket;
let ableNext = true;
let waveEffect = false;
let colorAni = 'red';
let waveActive = false;
let playSound = false;

export default function BoardInterface({room, playerAmount, playerTurn}){

      //=========================================================================================================================================
    /*
Copyright (c) 2011 Juan Mellado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
References:
- "OpenCV: Open Computer Vision Library"
  http://sourceforge.net/projects/opencvlibrary/
- "Stack Blur: Fast But Goodlooking"
  http://incubator.quasimondo.com/processing/fast_blur_deluxe.php
*/

var CV = CV || {};

CV.Image = function(width, height, data){
  this.width = width || 0;
  this.height = height || 0;
  this.data = data || [];
};

CV.grayscale = function(imageSrc, imageDst){
  var src = imageSrc.data, dst = imageDst.data, len = src.length,
      i = 0, j = 0;

  for (; i < len; i += 4){
    dst[j ++] =
      (src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114 + 0.5) & 0xff;
  }
  
  imageDst.width = imageSrc.width;
  imageDst.height = imageSrc.height;
  
  return imageDst;
};

CV.threshold = function(imageSrc, imageDst, threshold){
  var src = imageSrc.data, dst = imageDst.data,
      len = src.length, tab = [], i;

  for (i = 0; i < 256; ++ i){
    tab[i] = i <= threshold? 0: 255;
  }

  for (i = 0; i < len; ++ i){
    dst[i] = tab[ src[i] ];
  }

  imageDst.width = imageSrc.width;
  imageDst.height = imageSrc.height;

  return imageDst;
};

CV.adaptiveThreshold = function(imageSrc, imageDst, kernelSize, threshold){
  var src = imageSrc.data, dst = imageDst.data, len = src.length, tab = [], i;

  CV.stackBoxBlur(imageSrc, imageDst, kernelSize);

  for (i = 0; i < 768; ++ i){
    tab[i] = (i - 255 <= -threshold)? 255: 0;
  }

  for (i = 0; i < len; ++ i){
    dst[i] = tab[ src[i] - dst[i] + 255 ];
  }

  imageDst.width = imageSrc.width;
  imageDst.height = imageSrc.height;
  
  return imageDst;
};

CV.otsu = function(imageSrc){
  var src = imageSrc.data, len = src.length, hist = [],
      threshold = 0, sum = 0, sumB = 0, wB = 0, wF = 0, max = 0,
      mu, between, i;

  for (i = 0; i < 256; ++ i){
    hist[i] = 0;
  }
  
  for (i = 0; i < len; ++ i){
    hist[ src[i] ] ++;
  }

  for (i = 0; i < 256; ++ i){
    sum += hist[i] * i;
  }

  for (i = 0; i < 256; ++ i){
    wB += hist[i];
    if (0 !== wB){
    
      wF = len - wB;
      if (0 === wF){
        break;
      }

      sumB += hist[i] * i;
      
      mu = (sumB / wB) - ( (sum - sumB) / wF );

      between = wB * wF * mu * mu;
      
      if (between > max){
        max = between;
        threshold = i;
      }
    }
  }

  return threshold;
};

CV.stackBoxBlurMult =
  [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265];

CV.stackBoxBlurShift =
  [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13];

CV.BlurStack = function(){
  this.color = 0;
  this.next = null;
};

CV.stackBoxBlur = function(imageSrc, imageDst, kernelSize){
  var src = imageSrc.data, dst = imageDst.data,
      height = imageSrc.height, width = imageSrc.width,
      heightMinus1 = height - 1, widthMinus1 = width - 1,
      size = kernelSize + kernelSize + 1, radius = kernelSize + 1,
      mult = CV.stackBoxBlurMult[kernelSize],
      shift = CV.stackBoxBlurShift[kernelSize],
      stack, stackStart, color, sum, pos, start, p, x, y, i;

  stack = stackStart = new CV.BlurStack();
  for (i = 1; i < size; ++ i){
    stack = stack.next = new CV.BlurStack();
  }
  stack.next = stackStart;

  pos = 0;

  for (y = 0; y < height; ++ y){
    start = pos;
    
    color = src[pos];
    sum = radius * color;
    
    stack = stackStart;
    for (i = 0; i < radius; ++ i){
      stack.color = color;
      stack = stack.next;
    }
    for (i = 1; i < radius; ++ i){
      stack.color = src[pos + i];
      sum += stack.color;
      stack = stack.next;
    }
  
    stack = stackStart;
    for (x = 0; x < width; ++ x){
      dst[pos ++] = (sum * mult) >>> shift;
      
      p = x + radius;
      p = start + (p < widthMinus1? p: widthMinus1);
      sum -= stack.color - src[p];
      
      stack.color = src[p];
      stack = stack.next;
    }
  }

  for (x = 0; x < width; ++ x){
    pos = x;
    start = pos + width;
    
    color = dst[pos];
    sum = radius * color;
    
    stack = stackStart;
    for (i = 0; i < radius; ++ i){
      stack.color = color;
      stack = stack.next;
    }
    for (i = 1; i < radius; ++ i){
      stack.color = dst[start];
      sum += stack.color;
      stack = stack.next;
      
      start += width;
    }
    
    stack = stackStart;
    for (y = 0; y < height; ++ y){
      dst[pos] = (sum * mult) >>> shift;
      
      p = y + radius;
      p = x + ( (p < heightMinus1? p: heightMinus1) * width );
      sum -= stack.color - dst[p];
      
      stack.color = dst[p];
      stack = stack.next;
      
      pos += width;
    }
  }

  return imageDst;
};

CV.gaussianBlur = function(imageSrc, imageDst, imageMean, kernelSize){
  var kernel = CV.gaussianKernel(kernelSize);

  imageDst.width = imageSrc.width;
  imageDst.height = imageSrc.height;
  
  imageMean.width = imageSrc.width;
  imageMean.height = imageSrc.height;

  CV.gaussianBlurFilter(imageSrc, imageMean, kernel, true);
  CV.gaussianBlurFilter(imageMean, imageDst, kernel, false);

  return imageDst;
};

CV.gaussianBlurFilter = function(imageSrc, imageDst, kernel, horizontal){
  var src = imageSrc.data, dst = imageDst.data,
      height = imageSrc.height, width = imageSrc.width,
      pos = 0, limit = kernel.length >> 1,
      cur, value, i, j, k;
      
  for (i = 0; i < height; ++ i){
    
    for (j = 0; j < width; ++ j){
      value = 0.0;
    
      for (k = -limit; k <= limit; ++ k){

        if (horizontal){
          cur = pos + k;
          if (j + k < 0){
            cur = pos;
          }
          else if (j + k >= width){
            cur = pos;
          }
        }else{
          cur = pos + (k * width);
          if (i + k < 0){
            cur = pos;
          }
          else if (i + k >= height){
            cur = pos;
          }
        }

        value += kernel[limit + k] * src[cur];
      }
    
      dst[pos ++] = horizontal? value: (value + 0.5) & 0xff;
    }
  }

  return imageDst;
};

CV.gaussianKernel = function(kernelSize){
  var tab =
    [ [1],
      [0.25, 0.5, 0.25],
      [0.0625, 0.25, 0.375, 0.25, 0.0625],
      [0.03125, 0.109375, 0.21875, 0.28125, 0.21875, 0.109375, 0.03125] ],
    kernel = [], center, sigma, scale2X, sum, x, i;

  if ( (kernelSize <= 7) && (kernelSize % 2 === 1) ){
    kernel = tab[kernelSize >> 1];
  }else{
    center = (kernelSize - 1.0) * 0.5;
    sigma = 0.8 + (0.3 * (center - 1.0) );
    scale2X = -0.5 / (sigma * sigma);
    sum = 0.0;
    for (i = 0; i < kernelSize; ++ i){
      x = i - center;
      sum += kernel[i] = Math.exp(scale2X * x * x);
    }
    sum = 1 / sum;
    for (i = 0; i < kernelSize; ++ i){
      kernel[i] *= sum;
    }  
  }

  return kernel;
};

CV.findContours = function(imageSrc, binary){
  var width = imageSrc.width, height = imageSrc.height, contours = [],
      src, deltas, pos, pix, nbd, outer, hole, i, j;
  
  src = CV.binaryBorder(imageSrc, binary);

  deltas = CV.neighborhoodDeltas(width + 2);

  pos = width + 3;
  nbd = 1;

  for (i = 0; i < height; ++ i, pos += 2){
  
    for (j = 0; j < width; ++ j, ++ pos){
      pix = src[pos];

      if (0 !== pix){
        outer = hole = false;

        if (1 === pix && 0 === src[pos - 1]){
          outer = true;
        }
        else if (pix >= 1 && 0 === src[pos + 1]){
          hole = true;
        }

        if (outer || hole){
          ++ nbd;
          
          contours.push( CV.borderFollowing(src, pos, nbd, {x: j, y: i}, hole, deltas) );
        }
      }
    }
  }  

  return contours;
};

CV.borderFollowing = function(src, pos, nbd, point, hole, deltas){
  var contour = [], pos1, pos3, pos4, s, s_end, s_prev;

  contour.hole = hole;
      
  s = s_end = hole? 0: 4;
  do{
    s = (s - 1) & 7;
    pos1 = pos + deltas[s];
    if (src[pos1] !== 0){
      break;
    }
  }while(s !== s_end);
  
  if (s === s_end){
    src[pos] = -nbd;
    contour.push( {x: point.x, y: point.y} );

  }else{
    pos3 = pos;
    s_prev = s ^ 4;

    while(true){
      s_end = s;
    
      do{
        pos4 = pos3 + deltas[++ s];
      }while(src[pos4] === 0);
      
      s &= 7;
      
      if ( ( (s - 1) >>> 0) < (s_end >>> 0) ){
        src[pos3] = -nbd;
      }
      else if (src[pos3] === 1){
        src[pos3] = nbd;
      }

      contour.push( {x: point.x, y: point.y} );
      
      s_prev = s;

      point.x += CV.neighborhood[s][0];
      point.y += CV.neighborhood[s][1];

      if ( (pos4 === pos) && (pos3 === pos1) ){
        break;
      }
      
      pos3 = pos4;
      s = (s + 4) & 7;
    }
  }

  return contour;
};

CV.neighborhood = 
  [ [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1] ];

CV.neighborhoodDeltas = function(width){
  var deltas = [], len = CV.neighborhood.length, i = 0;
  
  for (; i < len; ++ i){
    deltas[i] = CV.neighborhood[i][0] + (CV.neighborhood[i][1] * width);
  }
  
  return deltas.concat(deltas);
};

CV.approxPolyDP = function(contour, epsilon){
  var slice = {start_index: 0, end_index: 0},
      right_slice = {start_index: 0, end_index: 0},
      poly = [], stack = [], len = contour.length,
      pt, start_pt, end_pt, dist, max_dist, le_eps,
      dx, dy, i, j, k;
  
  epsilon *= epsilon;
  
  k = 0;
  
  for (i = 0; i < 3; ++ i){
    max_dist = 0;
    
    k = (k + right_slice.start_index) % len;
    start_pt = contour[k];
    if (++ k === len) {k = 0;}
  
    for (j = 1; j < len; ++ j){
      pt = contour[k];
      if (++ k === len) {k = 0;}
    
      dx = pt.x - start_pt.x;
      dy = pt.y - start_pt.y;
      dist = dx * dx + dy * dy;

      if (dist > max_dist){
        max_dist = dist;
        right_slice.start_index = j;
      }
    }
  }

  if (max_dist <= epsilon){
    poly.push( {x: start_pt.x, y: start_pt.y} );

  }else{
    slice.start_index = k;
    slice.end_index = (right_slice.start_index += slice.start_index);
  
    right_slice.start_index -= right_slice.start_index >= len? len: 0;
    right_slice.end_index = slice.start_index;
    if (right_slice.end_index < right_slice.start_index){
      right_slice.end_index += len;
    }
    
    stack.push( {start_index: right_slice.start_index, end_index: right_slice.end_index} );
    stack.push( {start_index: slice.start_index, end_index: slice.end_index} );
  }

  while(stack.length !== 0){
    slice = stack.pop();
    
    end_pt = contour[slice.end_index % len];
    start_pt = contour[k = slice.start_index % len];
    if (++ k === len) {k = 0;}
    
    if (slice.end_index <= slice.start_index + 1){
      le_eps = true;
    
    }else{
      max_dist = 0;

      dx = end_pt.x - start_pt.x;
      dy = end_pt.y - start_pt.y;
      
      for (i = slice.start_index + 1; i < slice.end_index; ++ i){
        pt = contour[k];
        if (++ k === len) {k = 0;}
        
        dist = Math.abs( (pt.y - start_pt.y) * dx - (pt.x - start_pt.x) * dy);

        if (dist > max_dist){
          max_dist = dist;
          right_slice.start_index = i;
        }
      }
      
      le_eps = max_dist * max_dist <= epsilon * (dx * dx + dy * dy);
    }
    
    if (le_eps){
      poly.push( {x: start_pt.x, y: start_pt.y} );

    }else{
      right_slice.end_index = slice.end_index;
      slice.end_index = right_slice.start_index;

      stack.push( {start_index: right_slice.start_index, end_index: right_slice.end_index} );
      stack.push( {start_index: slice.start_index, end_index: slice.end_index} );
    }
  }
  
  return poly;
};

CV.warp = function(imageSrc, imageDst, contour, warpSize){
  var src = imageSrc.data, dst = imageDst.data,
      width = imageSrc.width, height = imageSrc.height,
      pos = 0,
      sx1, sx2, dx1, dx2, sy1, sy2, dy1, dy2, p1, p2, p3, p4,
      m, r, s, t, u, v, w, x, y, i, j;
  
  m = CV.getPerspectiveTransform(contour, warpSize - 1);

  r = m[8];
  s = m[2];
  t = m[5];
  
  for (i = 0; i < warpSize; ++ i){
    r += m[7];
    s += m[1];
    t += m[4];

    u = r;
    v = s;
    w = t;
    
    for (j = 0; j < warpSize; ++ j){
      u += m[6];
      v += m[0];
      w += m[3];

      x = v / u;
      y = w / u;

      sx1 = x >>> 0;
      sx2 = (sx1 === width - 1)? sx1: sx1 + 1;
      dx1 = x - sx1;
      dx2 = 1.0 - dx1;

      sy1 = y >>> 0;
      sy2 = (sy1 === height - 1)? sy1: sy1 + 1;
      dy1 = y - sy1;
      dy2 = 1.0 - dy1;

      p1 = p2 = sy1 * width;
      p3 = p4 = sy2 * width;

      dst[pos ++] = 
        (dy2 * (dx2 * src[p1 + sx1] + dx1 * src[p2 + sx2]) +
         dy1 * (dx2 * src[p3 + sx1] + dx1 * src[p4 + sx2]) ) & 0xff;

    }
  }

  imageDst.width = warpSize;
  imageDst.height = warpSize;

  return imageDst;
};

CV.getPerspectiveTransform = function(src, size){
  var rq = CV.square2quad(src);
  
  rq[0] /= size;
  rq[1] /= size;
  rq[3] /= size;
  rq[4] /= size;
  rq[6] /= size;
  rq[7] /= size;
  
  return rq;
};

CV.square2quad = function(src){
  var sq = [], px, py, dx1, dx2, dy1, dy2, den;
  
  px = src[0].x - src[1].x + src[2].x - src[3].x;
  py = src[0].y - src[1].y + src[2].y - src[3].y;
  
  if (0 === px && 0 === py){
    sq[0] = src[1].x - src[0].x;
    sq[1] = src[2].x - src[1].x;
    sq[2] = src[0].x;
    sq[3] = src[1].y - src[0].y;
    sq[4] = src[2].y - src[1].y;
    sq[5] = src[0].y;
    sq[6] = 0;
    sq[7] = 0;
    sq[8] = 1;

  }else{
    dx1 = src[1].x - src[2].x;
    dx2 = src[3].x - src[2].x;
    dy1 = src[1].y - src[2].y;
    dy2 = src[3].y - src[2].y;
    den = dx1 * dy2 - dx2 * dy1;
  
    sq[6] = (px * dy2 - dx2 * py) / den;
    sq[7] = (dx1 * py - px * dy1) / den;
    sq[8] = 1;
    sq[0] = src[1].x - src[0].x + sq[6] * src[1].x;
    sq[1] = src[3].x - src[0].x + sq[7] * src[3].x;
    sq[2] = src[0].x;
    sq[3] = src[1].y - src[0].y + sq[6] * src[1].y;
    sq[4] = src[3].y - src[0].y + sq[7] * src[3].y;
    sq[5] = src[0].y;
  }

  return sq;
};

CV.isContourConvex = function(contour){
  var orientation = 0, convex = true,
      len = contour.length, i = 0, j = 0,
      cur_pt, prev_pt, dxdy0, dydx0, dx0, dy0, dx, dy;

  prev_pt = contour[len - 1];
  cur_pt = contour[0];

  dx0 = cur_pt.x - prev_pt.x;
  dy0 = cur_pt.y - prev_pt.y;

  for (; i < len; ++ i){
    if (++ j === len) {j = 0;}

    prev_pt = cur_pt;
    cur_pt = contour[j];

    dx = cur_pt.x - prev_pt.x;
    dy = cur_pt.y - prev_pt.y;
    dxdy0 = dx * dy0;
    dydx0 = dy * dx0;

    orientation |= dydx0 > dxdy0? 1: (dydx0 < dxdy0? 2: 3);

    if (3 === orientation){
        convex = false;
        break;
    }

    dx0 = dx;
    dy0 = dy;
  }

  return convex;
};

CV.perimeter = function(poly){
  var len = poly.length, i = 0, j = len - 1,
      p = 0.0, dx, dy;

  for (; i < len; j = i ++){
    dx = poly[i].x - poly[j].x;
    dy = poly[i].y - poly[j].y;
    
    p += Math.sqrt(dx * dx + dy * dy) ;
  }

  return p;
};

CV.minEdgeLength = function(poly){
  var len = poly.length, i = 0, j = len - 1, 
      min = Infinity, d, dx, dy;

  for (; i < len; j = i ++){
    dx = poly[i].x - poly[j].x;
    dy = poly[i].y - poly[j].y;

    d = dx * dx + dy * dy;

    if (d < min){
      min = d;
    }
  }
  
  return Math.sqrt(min);
};

CV.countNonZero = function(imageSrc, square){
  var src = imageSrc.data, height = square.height, width = square.width,
      pos = square.x + (square.y * imageSrc.width),
      span = imageSrc.width - width,
      nz = 0, i, j;
  
  for (i = 0; i < height; ++ i){

    for (j = 0; j < width; ++ j){
    
      if ( 0 !== src[pos ++] ){
        ++ nz;
      }
    }
    
    pos += span;
  }

  return nz;
};

CV.binaryBorder = function(imageSrc, dst){
  var src = imageSrc.data, height = imageSrc.height, width = imageSrc.width,
      posSrc = 0, posDst = 0, i, j;

  for (j = -2; j < width; ++ j){
    dst[posDst ++] = 0;
  }

  for (i = 0; i < height; ++ i){
    dst[posDst ++] = 0;
    
    for (j = 0; j < width; ++ j){
      dst[posDst ++] = (0 === src[posSrc ++]? 0: 1);
    }
    
    dst[posDst ++] = 0;
  }

  for (j = -2; j < width; ++ j){
    dst[posDst ++] = 0;
  }
  
  return dst;
};

    //=========================================================================================================================================
    var AR = AR || {};

AR.Marker = function(id, corners){
  this.id = id;
  this.corners = corners;
};

AR.Detector = function(){
  this.grey = new CV.Image();
  this.thres = new CV.Image();
  this.homography = new CV.Image();
  this.binary = [];
  this.contours = [];
  this.polys = [];
  this.candidates = [];
};

AR.Detector.prototype.detect = function(image){
  CV.grayscale(image, this.grey);
  CV.adaptiveThreshold(this.grey, this.thres, 2, 7);
  
  this.contours = CV.findContours(this.thres, this.binary);

  this.candidates = this.findCandidates(this.contours, image.width * 0.20, 0.05, 10);
  this.candidates = this.clockwiseCorners(this.candidates);
  this.candidates = this.notTooNear(this.candidates, 10);

  return this.findMarkers(this.grey, this.candidates, 49);
};

AR.Detector.prototype.findCandidates = function(contours, minSize, epsilon, minLength){
  var candidates = [], len = contours.length, contour, poly, i;

  this.polys = [];
  
  for (i = 0; i < len; ++ i){
    contour = contours[i];

    if (contour.length >= minSize){
      poly = CV.approxPolyDP(contour, contour.length * epsilon);

      this.polys.push(poly);

      if ( (4 === poly.length) && ( CV.isContourConvex(poly) ) ){

        if ( CV.minEdgeLength(poly) >= minLength){
          candidates.push(poly);
        }
      }
    }
  }

  return candidates;
};

AR.Detector.prototype.clockwiseCorners = function(candidates){
  var len = candidates.length, dx1, dx2, dy1, dy2, swap, i;

  for (i = 0; i < len; ++ i){
    dx1 = candidates[i][1].x - candidates[i][0].x;
    dy1 = candidates[i][1].y - candidates[i][0].y;
    dx2 = candidates[i][2].x - candidates[i][0].x;
    dy2 = candidates[i][2].y - candidates[i][0].y;

    if ( (dx1 * dy2 - dy1 * dx2) < 0){
      swap = candidates[i][1];
      candidates[i][1] = candidates[i][3];
      candidates[i][3] = swap;
    }
  }

  return candidates;
};

AR.Detector.prototype.notTooNear = function(candidates, minDist){
  var notTooNear = [], len = candidates.length, dist, dx, dy, i, j, k;

  for (i = 0; i < len; ++ i){
  
    for (j = i + 1; j < len; ++ j){
      dist = 0;
      
      for (k = 0; k < 4; ++ k){
        dx = candidates[i][k].x - candidates[j][k].x;
        dy = candidates[i][k].y - candidates[j][k].y;
      
        dist += dx * dx + dy * dy;
      }
      
      if ( (dist / 4) < (minDist * minDist) ){
      
        if ( CV.perimeter( candidates[i] ) < CV.perimeter( candidates[j] ) ){
          candidates[i].tooNear = true;
        }else{
          candidates[j].tooNear = true;
        }
      }
    }
  }

  for (i = 0; i < len; ++ i){
    if ( !candidates[i].tooNear ){
      notTooNear.push( candidates[i] );
    }
  }

  return notTooNear;
};

AR.Detector.prototype.findMarkers = function(imageSrc, candidates, warpSize){
  var markers = [], len = candidates.length, candidate, marker, i;

  for (i = 0; i < len; ++ i){
    candidate = candidates[i];

    CV.warp(imageSrc, this.homography, candidate, warpSize);
  
    CV.threshold(this.homography, this.homography, CV.otsu(this.homography) );

    marker = this.getMarker(this.homography, candidate);
    if (marker){
      markers.push(marker);
    }
  }
  
  return markers;
};

AR.Detector.prototype.getMarker = function(imageSrc, candidate){
  var width = (imageSrc.width / 7) >>> 0,
      minZero = (width * width) >> 1,
      bits = [], rotations = [], distances = [],
      square, pair, inc, i, j;

  for (i = 0; i < 7; ++ i){
    inc = (0 === i || 6 === i)? 1: 6;
    
    for (j = 0; j < 7; j += inc){
      square = {x: j * width, y: i * width, width: width, height: width};
      if ( CV.countNonZero(imageSrc, square) > minZero){
        return null;
      }
    }
  }

  for (i = 0; i < 5; ++ i){
    bits[i] = [];

    for (j = 0; j < 5; ++ j){
      square = {x: (j + 1) * width, y: (i + 1) * width, width: width, height: width};
      
      bits[i][j] = CV.countNonZero(imageSrc, square) > minZero? 1: 0;
    }
  }

  rotations[0] = bits;
  distances[0] = this.hammingDistance( rotations[0] );
  
  pair = {first: distances[0], second: 0};
  
  for (i = 1; i < 4; ++ i){
    rotations[i] = this.rotate( rotations[i - 1] );
    distances[i] = this.hammingDistance( rotations[i] );
    
    if (distances[i] < pair.first){
      pair.first = distances[i];
      pair.second = i;
    }
  }

  if (0 !== pair.first){
    return null;
  }

  return new AR.Marker(
    this.mat2id( rotations[pair.second] ), 
    this.rotate2(candidate, 4 - pair.second) );
};

AR.Detector.prototype.hammingDistance = function(bits){
  var ids = [ [1,0,0,0,0], [1,0,1,1,1], [0,1,0,0,1], [0,1,1,1,0] ],
      dist = 0, sum, minSum, i, j, k;

  for (i = 0; i < 5; ++ i){
    minSum = Infinity;
    
    for (j = 0; j < 4; ++ j){
      sum = 0;

      for (k = 0; k < 5; ++ k){
          sum += bits[i][k] === ids[j][k]? 0: 1;
      }

      if (sum < minSum){
        minSum = sum;
      }
    }

    dist += minSum;
  }

  return dist;
};

AR.Detector.prototype.mat2id = function(bits){
  var id = 0, i;
  
  for (i = 0; i < 5; ++ i){
    id <<= 1;
    id |= bits[i][1];
    id <<= 1;
    id |= bits[i][3];
  }

  return id;
};

AR.Detector.prototype.rotate = function(src){
  var dst = [], len = src.length, i, j;
  
  for (i = 0; i < len; ++ i){
    dst[i] = [];
    for (j = 0; j < src[i].length; ++ j){
      dst[i][j] = src[src[i].length - j - 1][i];
    }
  }

  return dst;
};

AR.Detector.prototype.rotate2 = function(src, rotation){
  var dst = [], len = src.length, i;
  
  for (i = 0; i < len; ++ i){
    dst[i] = src[ (rotation + i) % len ];
  }

  return dst;
};
    //=========================================================================================================================================



    
    let video, canvas, context, imageData, detector;
    let video1, canvas1, context1, imageData1, detector1;

    useEffect(()=>{
        func();
        onLoad();
    }, [])

    const func = async () => {
        video1 = await document.getElementById("video1");
        canvas1 = await document.getElementById("canvas1");
        context1 = await canvas1.getContext("2d");

        canvas1.width = parseFloat(canvas1.style.width);
        canvas1.height = parseFloat(canvas1.style.height);

        const cameras = await navigator.mediaDevices.enumerateDevices();
        let id = 4;
        for (let i = 0; i < cameras.length; i++) {
          if(cameras[i].label === 'EOS Webcam Utility (0100:0400)'){
            id = i;
          }
        }
        //console.log(cameras);
        await navigator.mediaDevices.getUserMedia({
            video: {
                deviceId:{
                exact: cameras[id].deviceId
                },
            },
            }).then(function( video ) {
            video1.srcObject = video;
        })

        detector1 = new AR.Detector();
        requestAnimationFrame(tick2);
    }

    const tick2 = () =>{
        requestAnimationFrame(tick2);
        
        if (video1.readyState === video1.HAVE_ENOUGH_DATA){
            snapshot2();

            let markers = detector1.detect(imageData);
            drawCorners2(markers);
            drawId2(markers);
        }
    }

    const snapshot2 = () =>{
        context1.drawImage(video1, 0, 0, canvas1.width, canvas1.height);
        imageData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
    }
            
    const drawCorners2 = (markers) =>{
        let corners, corner, i, j;
        
        context1.lineWidth = 3;

        for (i = 0; i !== markers.length; ++ i){
            corners = markers[i].corners;
            
            context1.strokeStyle = "blue";
            context1.beginPath();
            
            for (j = 0; j !== corners.length; ++ j){
            corner = corners[j];
            context1.moveTo(corner.x, corner.y);
            corner = corners[(j + 1) % corners.length];
            context1.lineTo(corner.x, corner.y);
            }

            context1.stroke();
            context1.closePath();
            
            context1.strokeStyle = "blue";
            context1.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
        }
    }
    const [X1_P1, setX1_P1] = useState(-1);
    const [Y1_P1, setY1_P1] = useState(-1);
    const [X_P1, setX_P1] = useState(-1);
    const [Y_P1, setY_P1] = useState(-1);
    const [ID_P1, setID_P1] = useState(0);

    const [X1_P2, setX1_P2] = useState(-1);
    const [Y1_P2, setY1_P2] = useState(-1);
    const [X_P2, setX_P2] = useState(-1);
    const [Y_P2, setY_P2] = useState(-1);
    const [ID_P2, setID_P2] = useState(0);

    const [X1_P3, setX1_P3] = useState(-1);
    const [Y1_P3, setY1_P3] = useState(-1);
    const [X_P3, setX_P3] = useState(-1);
    const [Y_P3, setY_P3] = useState(-1);
    const [ID_P3, setID_P3] = useState(0);

    const [X1_P4, setX1_P4] = useState(-1);
    const [Y1_P4, setY1_P4] = useState(-1);
    const [X_P4, setX_P4] = useState(-1);
    const [Y_P4, setY_P4] = useState(-1);
    const [ID_P4, setID_P4] = useState(0);
    const drawId2 = (markers) =>{
        let corners, corner, x, y, i, j;
        
        for (i = 0; i !== markers.length; ++ i){
            corners = markers[i].corners;
            
            x = Infinity;
            y = Infinity;
            
            for (j = 0; j !== corners.length; ++ j){
                corner = corners[j];
                
                x = Math.min(x, corner.x);
                y = Math.min(y, corner.y);
            }
            //console.log('id: ', markers[i].id, ' - x: ',x,'- y: ', y)
            
            if(markers[i].id === 302){
              setX1_P1(x); setY1_P1(y);
              setID_P1(markers[i].id)
              setX_P1(-1); setY_P1(-1);
            }
            else if(markers[i].id === 73){
              setX1_P2(x); setY1_P2(y);
              setID_P2(markers[i].id)
              setX_P2(-1); setY_P2(-1);
            }
            else if(markers[i].id === 283){
              setX1_P3(x); setY1_P3(y);
              setID_P3(markers[i].id)
              setX_P3(-1); setY_P3(-1);
            }
            else if(markers[i].id === 220){
              setX1_P4(x); setY1_P4(y);
              setID_P4(markers[i].id)
              setX_P4(-1); setY_P4(-1);
            }
            context1.strokeText(markers[i].id, x, y)
        }
    }

    const onLoad = async () =>{
        //Vars 
        video = await document.getElementById("video");
        canvas = await document.getElementById("canvas");
        context = await canvas.getContext("2d");
        
        //Canvas width
        canvas.width = parseFloat(canvas.style.width);
        canvas.height = parseFloat(canvas.style.height);
        
        //Geen mediadevice
        if (navigator.mediaDevices === undefined) {
            return;
        }
        
        //Geen user media
        if (navigator.mediaDevices.getUserMedia === undefined) {
            return;
        }

        const cameras = await navigator.mediaDevices.enumerateDevices()
        await navigator.mediaDevices
            .getUserMedia({ 
                video: {
                    deviceId:{
                    exact: cameras[1].deviceId
                    },
                },
             })
            .then(function(stream) {
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
            })
            .catch(function(error) {
                console.log(error)
            }
        );
            
        detector = new AR.Detector();

        requestAnimationFrame(tick);
    }

    const tick = () =>{
        requestAnimationFrame(tick);
        
        if (video.readyState === video.HAVE_ENOUGH_DATA){
            snapshot();

            let markers = detector.detect(imageData);
            drawCorners(markers);
            drawId(markers);
        }
    }

    const snapshot = () =>{
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    }
            
    const drawCorners = (markers) =>{
        let corners, corner, i, j;
        
        context.lineWidth = 3;

        for (i = 0; i !== markers.length; ++ i){
            corners = markers[i].corners;
            
            context.strokeStyle = "blue";
            context.beginPath();
            
            for (j = 0; j !== corners.length; ++ j){
            corner = corners[j];
            context.moveTo(corner.x, corner.y);
            corner = corners[(j + 1) % corners.length];
            context.lineTo(corner.x, corner.y);
            }

            context.stroke();
            context.closePath();
            
            context.strokeStyle = "blue";
            context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
        }
    }
    let x, y, id;
    
    const drawId = (markers) =>{
        let corners, corner, i, j;
        
        for (i = 0; i !== markers.length; ++ i){
            corners = markers[i].corners;
            
            x = Infinity;
            y = Infinity;
            
            for (j = 0; j !== corners.length; ++ j){
                corner = corners[j];
                
                x = Math.min(x, corner.x);
                y = Math.min(y, corner.y);
            }

            if(markers[i].id === 302){
              setX_P1(x); setY_P1(y);
              setID_P1(markers[i].id)
              setX1_P1(-1); setY1_P1(-1);
            }
            else if(markers[i].id === 73){
              setX_P2(x); setY_P2(y);
              setID_P2(markers[i].id)
              setX1_P2(-1); setY1_P2(-1);
            }
            else if(markers[i].id === 283){
              setX_P3(x); setY_P3(y);
              setID_P3(markers[i].id)
              setX1_P3(-1); setY1_P3(-1);
            }
            else if(markers[i].id === 220){
              setX_P4(x); setY_P4(y);
              setID_P4(markers[i].id)
              setX1_P4(-1); setY1_P4(-1);
            }
        }
    }

  const CONNECTION_PORT = "localhost:3001/"
  useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(()=>{
    socket.emit('create_room', room);  
  }, [])

  const [pos1, setpos1] = useState('start');
  const [pos2, setpos2] = useState('start');
  const [pos3, setpos3] = useState('start');
  const [pos4, setpos4] = useState('start    ');



  const gradientP1 = useRef(null);
  const gradientP2 = useRef(null);
  const gradientP3 = useRef(null);
  const gradientP4 = useRef(null);

  const [backgroundP1, setbackgroundP1] = useState('radial-gradient(at 0% top, red, rgba(255, 0, 0, 0), transparent 100rem)');
  const [backgroundP2, setbackgroundP2] = useState('radial-gradient(at 0% top, blue,rgba(0, 255, 0, 0), transparent 100rem)');
  const [backgroundP3, setbackgroundP3] = useState('radial-gradient(at 0% top, green,rgba(0, 0, 255, 0), transparent 100rem)');
  const [backgroundP4, setbackgroundP4] = useState('radial-gradient(at 0% top, yellow,rgba(255, 255, 0, 0), transparent 100rem)');

  const resetColorExercise = () =>{
    setpreacherSource(preacher_b);
    setoxygenSource(oxygen)
    setbasicfitSource(basicfit);
    setbankjesSource(bankjes_b);
    setbenchpressSource(benchpress_b);
    setcablesSource(cables_b);
    setdeadliftSource(deadlift_b);
    setdumbbellsSource(dumbbells_b);
    setgewichten1Source(gewichten1_b);
    setgewichten2Source(gewichten2_b);
    setyogamatSource(yogamat_b);
    setzak_middenSource(zak_midden_b);
    setzak_onderSource(zak_onder_b);
    setzak_topSource(zak_top_b);
  }

  useEffect(()=>{
    resetColorExercise();
    //pos1Par(pos1);
    //Switch case percentage en top right bottom left
    switch (pos1) {
      case 'start':
        setbackgroundP1('radial-gradient(at 0% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '1':
        setbackgroundP1('radial-gradient(at 10% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'kaartje1':
        setbackgroundP1('radial-gradient(at 20% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '2':
        setpreacherSource(preacher_r);
        setbackgroundP1('radial-gradient(at 30% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '3':
        setbackgroundP1('radial-gradient(at 43% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'station1':
        setoxygenSource(oxygen_active);
        setbackgroundP1('radial-gradient(at 55% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'belastingen1':
        setgewichten1Source(gewichten1_r);
        setbackgroundP1('radial-gradient(at 68% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '4':
        setgewichten2Source(gewichten2_r);
        setbackgroundP1('radial-gradient(at 83% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '5':
        setbackgroundP1('radial-gradient(at 100% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'gevangenis':
        setbackgroundP1('radial-gradient(at 100% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '6':
        setbenchpressSource(benchpress_r)
        setbackgroundP1('radial-gradient(at 100% top,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '7':
        setzak_topSource(zak_top_r);
        setbackgroundP1('radial-gradient(at right 33%,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'kaartje2':
        setdeadliftSource(deadlift_r);
        setzak_middenSource(zak_midden_r);
        setbackgroundP1('radial-gradient(at right 61%,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '8':
        setzak_onderSource(zak_onder_r);
        setbackgroundP1('radial-gradient(at right 85%,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'rust':
        setbackgroundP1('radial-gradient(at right 100%,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '9':
        setbackgroundP1('radial-gradient(at 97% bottom,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '10':
        setyogamatSource(yogamat_r)
        setbackgroundP1('radial-gradient(at 81% bottom,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'kaartje3':
        setbackgroundP1('radial-gradient(at 68% bottom,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '11':
        setbackgroundP1('radial-gradient(at 56% bottom,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'station2':
        setbasicfitSource(basicfit_active)
        setbackgroundP1('radial-gradient(at 43% bottom,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '12':
        setdumbbellsSource(dumbbells_r)
        setbackgroundP1('radial-gradient(at 30% bottom,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'belastingen2':
        setdumbbellsSource(dumbbells_r)
        setbackgroundP1('radial-gradient(at 20% bottom,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '13':
        setbackgroundP1('radial-gradient(at 7% bottom,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'naar_gevang':
        setbackgroundP1('radial-gradient(at 0% bottom,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '14':
        setcablesSource(cables_r);
        setbackgroundP1('radial-gradient(at left 83%,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '15':
        setcablesSource(cables_r);
        setbackgroundP1('radial-gradient(at left 60%,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case 'kaartje4':
        setcablesSource(cables_r);
        setbackgroundP1('radial-gradient(at left 37%,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      case '16':
        setcablesSource(cables_r);
        setbackgroundP1('radial-gradient(at left 10%,red,rgba(255, 0, 0, 0), transparent 100rem)');
        break;
      default:
        break;
    }
  }, [pos1])

  useEffect(()=>{
    resetColorExercise();
    //pos2Par(pos2);
    //Switch case percentage en top right bottom left
    switch (pos2) {
      case 'start':
        setbackgroundP2('radial-gradient(at 0% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '1':
        setbackgroundP2('radial-gradient(at 10% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'kaartje1':
        setbackgroundP2('radial-gradient(at 20% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '2':
        setpreacherSource(preacher_b);
        setbackgroundP2('radial-gradient(at 30% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '3':
        setbackgroundP2('radial-gradient(at 43% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'station1':
        setoxygenSource(oxygen_active);
        setbackgroundP2('radial-gradient(at 55% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'belastingen1':
        setgewichten1Source(gewichten1_b);
        setbackgroundP2('radial-gradient(at 68% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '4':
        setgewichten2Source(gewichten2_b);
        setbackgroundP2('radial-gradient(at 83% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '5':
        setbackgroundP2('radial-gradient(at 100% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'gevangenis':
        setbackgroundP2('radial-gradient(at 100% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '6':
        setbenchpressSource(benchpress_b);
        setbackgroundP2('radial-gradient(at 100% top,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '7':
        setzak_topSource(zak_top_b)
        setbackgroundP2('radial-gradient(at right 33%,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'kaartje2':
        setzak_middenSource(zak_midden_b)
        setdeadliftSource(deadlift_b);
        setbackgroundP2('radial-gradient(at right 61%,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '8':
        setzak_onderSource(zak_onder_b)
        setbackgroundP2('radial-gradient(at right 85%,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'rust':
        setbackgroundP2('radial-gradient(at right 100%,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '9':
        setbackgroundP2('radial-gradient(at 97% bottom,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '10':
        setyogamatSource(yogamat_b);
        setbackgroundP2('radial-gradient(at 81% bottom,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'kaartje3':
        setbackgroundP2('radial-gradient(at 68% bottom,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '11':
        setbackgroundP2('radial-gradient(at 56% bottom,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'station2':
        setbasicfitSource(basicfit_active);
        setbackgroundP2('radial-gradient(at 43% bottom,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '12':
        setdumbbellsSource(dumbbells_b)
        setbackgroundP2('radial-gradient(at 30% bottom,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'belastingen2':
        setdumbbellsSource(dumbbells_b)
        setbackgroundP2('radial-gradient(at 20% bottom,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '13':
        setbackgroundP2('radial-gradient(at 7% bottom,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'naar_gevang':
        setbackgroundP2('radial-gradient(at 0% bottom,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '14':
        setcablesSource(cables_b);
        setbackgroundP2('radial-gradient(at left 83%,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '15':
        setcablesSource(cables_b);
        setbackgroundP2('radial-gradient(at left 60%,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case 'kaartje4':
        setcablesSource(cables_b);
        setbackgroundP2('radial-gradient(at left 37%,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      case '16':
        setcablesSource(cables_b);
        setbackgroundP2('radial-gradient(at left 10%,blue,rgba(0, 255, 0, 0), transparent 100rem)');
        break;
      default:
        break;
    }
  }, [pos2])

  useEffect(()=>{
    resetColorExercise();
    //pos3Par(pos3);
    //Switch case percentage en top right bottom left
    switch (pos3) {
      case 'start':
        setbackgroundP3('radial-gradient(at 0% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '1':
        setbackgroundP3('radial-gradient(at 10% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'kaartje1':
        setbackgroundP3('radial-gradient(at 20% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '2':
        setpreacherSource(preacher_g);
        setbackgroundP3('radial-gradient(at 30% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '3':
        setbackgroundP3('radial-gradient(at 43% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'station1':
        setoxygenSource(oxygen_active)
        setbackgroundP3('radial-gradient(at 55% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'belastingen1':
        setgewichten1Source(gewichten1_g)
        setbackgroundP3('radial-gradient(at 68% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '4':
        setgewichten2Source(gewichten2_g)
        setbackgroundP3('radial-gradient(at 83% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '5':
        setbackgroundP3('radial-gradient(at 100% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'gevangenis':
        setbackgroundP3('radial-gradient(at 100% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '6':
        setbenchpressSource(benchpress_g);
        setbackgroundP3('radial-gradient(at 100% top,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '7':
        setzak_topSource(zak_top_g)
        setbackgroundP3('radial-gradient(at right 33%,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'kaartje2':
        setzak_middenSource(zak_midden_g)
        setdeadliftSource(deadlift_g);
        setbackgroundP3('radial-gradient(at right 61%,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '8':
        setzak_onderSource(zak_onder_g);
        setbackgroundP3('radial-gradient(at right 85%,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'rust':
        setbackgroundP3('radial-gradient(at right 100%,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '9':
        setbackgroundP3('radial-gradient(at 97% bottom,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '10':
        setyogamatSource(yogamat_g);
        setbackgroundP3('radial-gradient(at 81% bottom,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'kaartje3':
        setbackgroundP3('radial-gradient(at 68% bottom,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '11':
        setbackgroundP3('radial-gradient(at 56% bottom,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'station2':
        setbasicfitSource(basicfit_active);
        setbackgroundP3('radial-gradient(at 43% bottom,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '12':
        setbackgroundP3('radial-gradient(at 30% bottom,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'belastingen2':
        setbackgroundP3('radial-gradient(at 20% bottom,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '13':
        setbackgroundP3('radial-gradient(at 7% bottom,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'naar_gevang':
        setbackgroundP3('radial-gradient(at 0% bottom,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '14':
        setcablesSource(cables_g);
        setbackgroundP3('radial-gradient(at left 83%,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '15':
        setcablesSource(cables_g);
        setbackgroundP3('radial-gradient(at left 60%,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case 'kaartje4':
        setcablesSource(cables_g);
        setbackgroundP3('radial-gradient(at left 37%,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      case '16':
        setcablesSource(cables_g);
        setbackgroundP3('radial-gradient(at left 10%,green,rgba(0, 0, 255, 0), transparent 100rem)');
        break;
      default:
        break;
    }
  }, [pos3])

  useEffect(()=>{
    //pos4Par(pos4);
    resetColorExercise();
    //Switch case percentage en top right bottom left
    switch (pos4) {
      case 'start':
        setbackgroundP4('radial-gradient(at 0% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '1':
        setbackgroundP4('radial-gradient(at 10% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'kaartje1':
        setbackgroundP4('radial-gradient(at 20% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '2':
        setpreacherSource(preacher_y);
        setbackgroundP4('radial-gradient(at 30% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '3':
        setbackgroundP4('radial-gradient(at 43% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'station1':
        setoxygenSource(oxygen_active);
        setbackgroundP4('radial-gradient(at 55% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'belastingen1':
        setgewichten1Source(gewichten1_y);
        setbackgroundP4('radial-gradient(at 68% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '4':
        setgewichten2Source(gewichten2_y);
        setbackgroundP4('radial-gradient(at 83% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '5':
        setbackgroundP4('radial-gradient(at 100% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'gevangenis':
        setbackgroundP4('radial-gradient(at 100% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '6':
        setbenchpressSource(benchpress_y)
        setbackgroundP4('radial-gradient(at 100% top,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '7':
        setbackgroundP4('radial-gradient(at right 33%,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'kaartje2':
        setdeadliftSource(deadlift_y);
        setbackgroundP4('radial-gradient(at right 61%,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '8':
        setbackgroundP4('radial-gradient(at right 85%,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'rust':
        setbackgroundP4('radial-gradient(at right 100%,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '9':
        setbackgroundP4('radial-gradient(at 97% bottom,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '10':
        setyogamatSource(yogamat_y);
        setbackgroundP4('radial-gradient(at 81% bottom,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'kaartje3':
        setbackgroundP4('radial-gradient(at 68% bottom,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '11':
        setbackgroundP4('radial-gradient(at 56% bottom,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'station2':
        setbasicfitSource(basicfit_active)
        setbackgroundP4('radial-gradient(at 43% bottom,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '12':
        setdumbbellsSource(dumbbells_y);
        setbackgroundP4('radial-gradient(at 30% bottom,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'belastingen2':
        setdumbbellsSource(dumbbells_y);
        setbackgroundP4('radial-gradient(at 20% bottom,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '13':
        setbackgroundP4('radial-gradient(at 7% bottom,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'naar_gevang':
        setbackgroundP4('radial-gradient(at 0% bottom,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '14':
        setcablesSource(cables_y);
        setbackgroundP4('radial-gradient(at left 83%,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '15':
        setcablesSource(cables_y);
        setbackgroundP4('radial-gradient(at left 60%,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case 'kaartje4':
        setcablesSource(cables_y);
        setbackgroundP4('radial-gradient(at left 37%,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      case '16':
        setcablesSource(cables_y);
        setbackgroundP4('radial-gradient(at left 10%,yellow,rgba(255, 255, 0, 0), transparent 100rem)');
        break;
      default:
        break;
    }
  }, [pos4])


  useEffect(()=>{
    if(X_P1 < 50 && X_P1 >= 0){
      if(Y_P1 < 50){
        //Start
        setpos1('start')
      }
      else if(Y_P1 >= 50 && Y_P1 < 94){
        //1
        setpos1('1')
      }
      else if(Y_P1 >= 94 && Y_P1 < 140){
        //kaartje
        setpos1('kaartje1')
      }
      else if(Y_P1 >= 140 && Y_P1 < 185){
        //2
        setpos1('2')
      }
      else if(Y_P1 >= 185 && Y_P1 < 230){
        //3
        setpos1('3')
      }
      else if(Y_P1 >= 230){
        //station
        setpos1('station1')
      }
    }
    else if(X1_P1 < 65 && X1_P1 >= 0){
      if(Y1_P1 < 60 && Y1_P1 >= 0){
        //belasting
        setpos1('belastingen1')
      }
      else if(Y1_P1 >= 60 && Y1_P1 < 100){
        //4
        setpos1('4')
      }
      else if(Y1_P1 >= 100 && Y1_P1 < 150){
        //5
        setpos1('5')
      }
      else if(Y1_P1 >= 150){
        //gevangenis
        setpos1('gevangenis')
      }
    }
    else if(Y1_P1 > 160){
      if(X1_P1 < 100 && X1_P1 >= 0){
        //6
        setpos1('6')
      }
      else if(X1_P1 >= 100 && X1_P1 < 147){
        //7
        setpos1('7')
      }
      else if(X1_P1 >= 147 && X1_P1 < 193){
        //kaartje
        setpos1('kaartje2')
      }
      else if(X1_P1 >= 192 && X1_P1 < 238){
        //8
        setpos1('8')
      }
      else if(X1_P1 >= 238){
        //rust
        setpos1('rust')
      }
    }
    else if(X1_P1 > 240){
      if(Y1_P1 < 27 && Y1_P1 >= 0){
        //11
        setpos1('11')
      }
      else if(Y1_P1 >= 27 && Y1_P1 < 70){
        //kaartje
        setpos1('kaartje3')
      }
      else if(Y1_P1 >= 70 && Y1_P1 < 113){
        //10
        setpos1('10')
      }
      else if(Y1_P1 >= 113){
        //9
        setpos1('9')
      }
    }
    else if(X_P1 > 320){
      if(Y_P1 >= 0 && Y_P1 < 44){
        //naar gevang
        setpos1('naar_gevangenis')
      }
      else if(Y_P1 >= 44 && Y_P1 < 99){
        //13
        setpos1('13')
      }
      else if(Y_P1 >= 99 && Y_P1 < 136){
        //belastingen
        setpos1('belastingen2')
      }
      else if(Y_P1 >= 136 && Y_P1 < 185){
        //12
        setpos1('12')
      }
      else if(Y_P1 >= 185 && Y_P1 < 238){
        //station
        setpos1('station2')
      }
      else if(Y_P1 >= 238){
        //11
        setpos1('11')
      }
    }
    else if(Y_P1 < 50 && Y_P1 >= 0){
      if(X_P1 >= 0 && X_P1 < 120){
        //16
        setpos1('16');
      }
      else if(X_P1 >= 120 && X_P1 < 181){
        //kaartje
        setpos1('kaartje4');
      }
      else if(X_P1 >= 181 && X_P1 < 244){
        //15
        setpos1('15');
      }
      else if(X_P1 >= 244){
        //14
        setpos1('14');
      }
    }
  }, [X_P1, Y_P1, X1_P1, Y1_P1])

  useEffect(()=>{
    if(X_P2 < 50 && X_P2 >= 0){
      if(Y_P2 < 50){
        //Start
        setpos2('start')
      }
      else if(Y_P1 >= 50 && Y_P1 < 94){
        //1
        setpos2('1')
      }
      else if(Y_P1 >= 94 && Y_P1 < 140){
        //kaartje
        setpos2('kaartje1')
      }
      else if(Y_P1 >= 140 && Y_P1 < 185){
        //2
        setpos2('2')
      }
      else if(Y_P1 >= 185 && Y_P1 < 230){
        //3
        setpos2('3')
      }
      else if(Y_P1 >= 230){
        //station
        setpos2('station1')
      }
    }
    else if(X1_P2 < 65 && X1_P2 >= 0){
      if(Y1_P2 < 60 && Y1_P2 >= 0){
        //belasting
        setpos2('belastingen1')
      }
      else if(Y1_P2 >= 60 && Y1_P2 < 100){
        //4
        setpos2('4')
      }
      else if(Y1_P2 >= 100 && Y1_P2 < 150){
        //5
        setpos2('5')
      }
      else if(Y1_P2 >= 150){
        //gevangenis
        setpos2('gevangenis')
      }
    }
    else if(Y1_P2 > 160){
      if(X1_P2 < 100 && X1_P2 >= 0){
        //6
        setpos2('6')
      }
      else if(X1_P2 >= 100 && X1_P2 < 147){
        //7
        setpos2('7')
      }
      else if(X1_P2 >= 147 && X1_P2 < 193){
        //kaartje
        setpos2('kaartje2')
      }
      else if(X1_P2 >= 192 && X1_P2 < 238){
        //8
        setpos2('8')
      }
      else if(X1_P2 >= 238){
        //rust
        setpos2('rust')
      }
    }
    else if(X1_P2 > 240){
      if(Y1_P2 < 27 && Y1_P2 >= 0){
        //11
        setpos2('11')
      }
      else if(Y1_P2 >= 27 && Y1_P2 < 70){
        //kaartje
        setpos2('kaartje3')
      }
      else if(Y1_P2 >= 70 && Y1_P2 < 113){
        //10
        setpos2('10')
      }
      else if(Y1_P2 >= 113){
        //9
        setpos2('9')
      }
    }
    else if(X_P2 > 320){
      if(Y_P2 >= 0 && Y_P2 < 44){
        //naar gevang
        setpos2('naar_gevangenis')
      }
      else if(Y_P2 >= 44 && Y_P2 < 99){
        //13
        setpos2('13')
      }
      else if(Y_P2 >= 99 && Y_P2 < 136){
        //belastingen
        setpos2('belastingen2')
      }
      else if(Y_P2 >= 136 && Y_P2 < 185){
        //12
        setpos2('12')
      }
      else if(Y_P2 >= 185 && Y_P2 < 238){
        //station
        setpos2('station2')
      }
      else if(Y_P2 >= 238){
        //11
        setpos2('11')
      }
    }
    else if(Y_P2 < 50 && Y_P2 >= 0){
      if(X_P2 >= 0 && X_P2 < 120){
        //16
        setpos2('16');
      }
      else if(X_P2 >= 120 && X_P2 < 181){
        //kaartje
        setpos2('kaartje4');
      }
      else if(X_P2 >= 181 && X_P2 < 244){
        //15
        setpos2('15');
      }
      else if(X_P2 >= 244){
        //14
        setpos2('14');
      }
    }
  }, [X_P2, Y_P2, X1_P2, Y1_P2])

  useEffect(()=>{
    if(X_P3 < 50 && X_P3 >= 0){
      if(Y_P3 < 50){
        //Start
        setpos3('start')
      }
      else if(Y_P1 >= 50 && Y_P1 < 94){
        //1
        setpos3('1')
      }
      else if(Y_P1 >= 94 && Y_P1 < 140){
        //kaartje
        setpos3('kaartje1')
      }
      else if(Y_P1 >= 140 && Y_P1 < 185){
        //2
        setpos3('2')
      }
      else if(Y_P1 >= 185 && Y_P1 < 230){
        //3
        setpos3('3')
      }
      else if(Y_P1 >= 230){
        //station
        setpos3('station1')
      }
    }
    else if(X1_P3 < 65 && X1_P3 >= 0){
      if(Y1_P3 < 60 && Y1_P3 >= 0){
        //belasting
        setpos3('belastingen1')
      }
      else if(Y1_P3 >= 60 && Y1_P3 < 100){
        //4
        setpos3('4')
      }
      else if(Y1_P3 >= 100 && Y1_P3 < 150){
        //5
        setpos3('5')
      }
      else if(Y1_P3 >= 150){
        //gevangenis
        setpos3('gevangenis')
      }
    }
    else if(Y1_P3 > 160){
      if(X1_P3 < 100 && X1_P3 >= 0){
        //6
        setpos3('6')
      }
      else if(X1_P3 >= 100 && X1_P3 < 147){
        //7
        setpos3('7')
      }
      else if(X1_P3 >= 147 && X1_P3 < 193){
        //kaartje
        setpos3('kaartje2')
      }
      else if(X1_P3 >= 192 && X1_P3 < 238){
        //8
        setpos3('8')
      }
      else if(X1_P3 >= 238){
        //rust
        setpos3('rust')
      }
    }
    else if(X1_P3 > 240){
      if(Y1_P3 < 27 && Y1_P3 >= 0){
        //11
        setpos3('11')
      }
      else if(Y1_P3 >= 27 && Y1_P3 < 70){
        //kaartje
        setpos3('kaartje3')
      }
      else if(Y1_P3 >= 70 && Y1_P3 < 113){
        //10
        setpos3('10')
      }
      else if(Y1_P3 >= 113){
        //9
        setpos3('9')
      }
    }
    else if(X_P3 > 320){
      if(Y_P3 >= 0 && Y_P3 < 44){
        //naar gevang
        setpos3('naar_gevangenis')
      }
      else if(Y_P3 >= 44 && Y_P3 < 99){
        //13
        setpos3('13')
      }
      else if(Y_P3 >= 99 && Y_P3 < 136){
        //belastingen
        setpos3('belastingen2')
      }
      else if(Y_P3 >= 136 && Y_P3 < 185){
        //12
        setpos3('12')
      }
      else if(Y_P3 >= 185 && Y1_P3 < 238){
        //station
        setpos3('station2')
      }
      else if(Y_P3 >= 238){
        //11
        setpos3('11')
      }
    }
    else if(Y_P3 < 50 && Y_P3 >= 0){
      if(X_P3 >= 0 && X_P3 < 120){
        //16
        setpos3('16');
      }
      else if(X_P3 >= 120 && X_P3 < 181){
        //kaartje
        setpos3('kaartje4');
      }
      else if(X_P3 >= 181 && X_P3 < 244){
        //15
        setpos3('15');
      }
      else if(X_P3 >= 244){
        //14
        setpos3('14');
      }
    }
  }, [X_P3, Y_P3, X1_P3, Y1_P3])

  useEffect(()=>{
    if(X_P4 < 50 && X_P4 >= 0){
      if(Y_P4 < 50){
        //Start
        setpos4('start')
      }
      else if(Y_P1 >= 50 && Y_P1 < 94){
        //1
        setpos4('1')
      }
      else if(Y_P1 >= 94 && Y_P1 < 140){
        //kaartje
        setpos4('kaartje1')
      }
      else if(Y_P1 >= 140 && Y_P1 < 185){
        //2
        setpos4('2')
      }
      else if(Y_P1 >= 185 && Y_P1 < 230){
        //3
        setpos4('3')
      }
      else if(Y_P1 >= 230){
        //station
        setpos4('station1')
      }
    }
    else if(X1_P4 < 65 && X1_P4 >= 0){
      if(Y1_P4 < 60 && Y1_P4 >= 0){
        //belasting
        setpos4('belastingen1')
      }
      else if(Y1_P4 >= 60 && Y1_P4 < 100){
        //4
        setpos4('4')
      }
      else if(Y1_P4 >= 100 && Y1_P4 < 150){
        //5
        setpos4('5')
      }
      else if(Y1_P4 >= 150){
        //gevangenis
        setpos4('gevangenis')
      }
    }
    else if(Y1_P4 > 160){
      if(X1_P4 < 100 && X1_P4 >= 0){
        //6
        setpos4('6')
      }
      else if(X1_P4 >= 100 && X1_P4 < 147){
        //7
        setpos4('7')
      }
      else if(X1_P4 >= 147 && X1_P4 < 193){
        //kaartje
        setpos4('kaartje2')
      }
      else if(X1_P4 >= 192 && X1_P4 < 238){
        //8
        setpos4('8')
      }
      else if(X1_P4 >= 238){
        //rust
        setpos4('rust')
      }
    }
    else if(X1_P4 > 240){
      if(Y1_P4 < 27 && Y1_P4 >= 0){
        //11
        setpos4('11')
      }
      else if(Y1_P4 >= 27 && Y1_P4 < 70){
        //kaartje
        setpos4('kaartje3')
      }
      else if(Y1_P4 >= 70 && Y1_P4 < 113){
        //10
        setpos4('10')
      }
      else if(Y1_P4 >= 113){
        //9
        setpos4('9')
      }
    }
    else if(X_P4 > 320){
      if(Y_P4 >= 0 && Y_P4 < 44){
        //naar gevang
        setpos4('naar_gevangenis')
      }
      else if(Y_P4 >= 44 && Y_P4 < 99){
        //13
        setpos4('13')
      }
      else if(Y_P4 >= 99 && Y_P4 < 136){
        //belastingen
        setpos4('belastingen2')
      }
      else if(Y_P4 >= 136 && Y_P4 < 185){
        //12
        setpos4('12')
      }
      else if(Y_P4 >= 185 && Y_P4 < 238){
        //station
        setpos4('station2')
      }
      else if(Y_P4 >= 238){
        //11
        setpos4('11')
      }
    }
    else if(Y_P4 < 50 && Y_P4 >= 0){
      if(X_P4 >= 0 && X_P4 < 120){
        //16
        setpos4('16');
      }
      else if(X_P4 >= 120 && X_P4 < 181){
        //kaartje
        setpos4('kaartje4');
      }
      else if(X_P4 >= 181 && X_P4 < 244){
        //15
        setpos4('15');
      }
      else if(X_P4 >= 244){
        //14
        setpos4('14');
      }
    }
  }, [X_P4, Y_P4, X1_P4, Y1_P4])

  const [ringSource, setringSource] = useState(ring);
  const [oxygenSource, setoxygenSource] = useState(oxygen);
  const [basicfitSource, setbasicfitSource] = useState(basicfit);
  const [bankjesSource, setbankjesSource] = useState(bankjes_b);
  const [benchpressSource, setbenchpressSource] = useState(benchpress_b);
  const [cablesSource, setcablesSource] = useState(cables_b);
  const [deadliftSource, setdeadliftSource] = useState(deadlift_b);
  const [dumbbellsSource, setdumbbellsSource] = useState(dumbbells_b);
  const [gewichten1Source, setgewichten1Source] = useState(gewichten1_b);
  const [gewichten2Source, setgewichten2Source] = useState(gewichten2_b);
  const [preacherSource, setpreacherSource] = useState(preacher_b);
  const [yogamatSource, setyogamatSource] = useState(yogamat_b);
  const [zak_topSource, setzak_topSource] = useState(zak_top_b);
  const [zak_middenSource, setzak_middenSource] = useState(zak_midden_b);
  const [zak_onderSource, setzak_onderSource] = useState(zak_onder_b);

  const [middleColor, setmiddleColor] = useState(styles.middle);
  const waveFunction = (color) =>{
    waveActive = true;
    
    const one = () =>{
      console.log('wave');
      if(!waveEffect){return;}
      if(color === 'red'){setcablesSource(cables_r);}
      else if(color === 'blue'){setcablesSource(cables_b);}
      else if(color === 'green'){setcablesSource(cables_g);}
      else if(color === 'yellow'){setcablesSource(cables_y);}
      setpreacherSource(preacher_w); setbankjesSource(bankjes_w); 
      setringSource(ring_w); 
      setgewichten1Source(gewichten1_w); setgewichten2Source(gewichten2_w); setzak_topSource(zak_top_w); setzak_middenSource(zak_midden_w); setzak_onderSource(zak_onder_w); setyogamatSource(yogamat_w);
      setbenchpressSource(benchpress_w); setdeadliftSource(deadlift_w);
      setTimeout(two, 800);
    }
    const two = () =>{
      if(!waveEffect){return;}
      if(color === 'red'){setpreacherSource(preacher_r); setbankjesSource(bankjes_r); setdumbbellsSource(dumbbells_r);}
      else if(color === 'blue'){setpreacherSource(preacher_b); setbankjesSource(bankjes_b); setdumbbellsSource(dumbbells_b);}
      else if(color === 'green'){setpreacherSource(preacher_g); setbankjesSource(bankjes_g); setdumbbellsSource(dumbbells_g);}
      else if(color === 'yellow'){setpreacherSource(preacher_y); setbankjesSource(bankjes_y); setdumbbellsSource(dumbbells_y);}
      setcablesSource(cables_w);   
      
      setringSource(ring_w); 
      setgewichten1Source(gewichten1_w); setgewichten2Source(gewichten2_w); setzak_topSource(zak_top_w); setzak_middenSource(zak_midden_w); setzak_onderSource(zak_onder_w); setyogamatSource(yogamat_w);
      setbenchpressSource(benchpress_w); setdeadliftSource(deadlift_w);
      setTimeout(three, 800);
    }
    const three = () =>{
      if(!waveEffect){return;}
      if(color === 'red'){setringSource(ring_r);}
      else if(color === 'blue'){setringSource(ring);}
      else if(color === 'green'){setringSource(ring_g);}
      else if(color === 'yellow'){setringSource(ring_y);}
      setcablesSource(cables_w);
      setpreacherSource(preacher_w); setbankjesSource(bankjes_w); setdumbbellsSource(dumbbells_w);
      
      setgewichten1Source(gewichten1_w); setgewichten2Source(gewichten2_w); setzak_topSource(zak_top_w); setzak_middenSource(zak_midden_w); setzak_onderSource(zak_onder_w); setyogamatSource(yogamat_w);
      setbenchpressSource(benchpress_w); setdeadliftSource(deadlift_w);
      setTimeout(four, 800);
    }
    const four = () =>{
      if(!waveEffect){return;}
      if(color === 'red'){setgewichten1Source(gewichten1_r); setgewichten2Source(gewichten2_r); setzak_topSource(zak_top_r); setzak_middenSource(zak_midden_r); setzak_onderSource(zak_onder_r); setyogamatSource(yogamat_r);}
      else if(color === 'blue'){setgewichten1Source(gewichten1_b); setgewichten2Source(gewichten2_b); setzak_topSource(zak_top_b); setzak_middenSource(zak_midden_b); setzak_onderSource(zak_onder_b); setyogamatSource(yogamat_b);}
      else if(color === 'green'){setgewichten1Source(gewichten1_g); setgewichten2Source(gewichten2_g); setzak_topSource(zak_top_g); setzak_middenSource(zak_midden_g); setzak_onderSource(zak_onder_g); setyogamatSource(yogamat_g);}
      else if(color === 'yellow'){setgewichten1Source(gewichten1_y); setgewichten2Source(gewichten2_y); setzak_topSource(zak_top_y); setzak_middenSource(zak_midden_y); setzak_onderSource(zak_onder_y); setyogamatSource(yogamat_y);}
      setcablesSource(cables_w);
      setpreacherSource(preacher_w); setbankjesSource(bankjes_w); setdumbbellsSource(dumbbells_w); 
      setringSource(ring_w); 
      
      setbenchpressSource(benchpress_w); setdeadliftSource(deadlift_w);
      setTimeout(five, 800);
    }
    const five = () =>{
      if(!waveEffect){return;}
      if(color === 'red'){setbenchpressSource(benchpress_r); setdeadliftSource(deadlift_r);}
      else if(color === 'blue'){setbenchpressSource(benchpress_b); setdeadliftSource(deadlift_b);}
      else if(color === 'green'){setbenchpressSource(benchpress_g); setdeadliftSource(deadlift_g);}
      else if(color === 'yellow'){setbenchpressSource(benchpress_y); setdeadliftSource(deadlift_y);}
      setcablesSource(cables_w);
      setpreacherSource(preacher_w); setbankjesSource(bankjes_w); setdumbbellsSource(dumbbells_w);
      setringSource(ring_w); 
      setgewichten1Source(gewichten1_w); setgewichten2Source(gewichten2_w); setzak_topSource(zak_top_w); setzak_middenSource(zak_midden_w); setzak_onderSource(zak_onder_w); setyogamatSource(yogamat_w);
      
      setTimeout(one, 800);
    }
    one();
  }

  const swipeNextPlayer = (color) =>{
    setshowAnimationNextPlayer(true);
    if(color === 'red'){setmiddleColor(styles.middleR);setcolorAnimationNextPlayer(nxtP0);setdumbbellsSource(dumbbells_r);setcablesSource(cables_r);setpreacherSource(preacher_r); setbankjesSource(bankjes_r);setringSource(ring_r);setgewichten1Source(gewichten1_r); setgewichten2Source(gewichten2_r); setzak_topSource(zak_top_r); setzak_middenSource(zak_midden_r); setzak_onderSource(zak_onder_r); setyogamatSource(yogamat_r);setbenchpressSource(benchpress_r); setdeadliftSource(deadlift_r);}
    if(color === 'blue'){setmiddleColor(styles.middleB);setcolorAnimationNextPlayer(nxtP1);setdumbbellsSource(dumbbells_b);setcablesSource(cables_b);setpreacherSource(preacher_b); setbankjesSource(bankjes_b);setringSource(ring);setgewichten1Source(gewichten1_b); setgewichten2Source(gewichten2_b); setzak_topSource(zak_top_b); setzak_middenSource(zak_midden_b); setzak_onderSource(zak_onder_b); setyogamatSource(yogamat_b);setbenchpressSource(benchpress_b); setdeadliftSource(deadlift_b);}
    if(color === 'green'){setmiddleColor(styles.middleG);setcolorAnimationNextPlayer(nxtP2);setdumbbellsSource(dumbbells_g);setcablesSource(cables_g);setpreacherSource(preacher_g); setbankjesSource(bankjes_g);setringSource(ring_g);setgewichten1Source(gewichten1_g); setgewichten2Source(gewichten2_g); setzak_topSource(zak_top_g); setzak_middenSource(zak_midden_g); setzak_onderSource(zak_onder_g); setyogamatSource(yogamat_g);setbenchpressSource(benchpress_g); setdeadliftSource(deadlift_g);}
    if(color === 'yellow'){setmiddleColor(styles.middleY);setcolorAnimationNextPlayer(nxtP3);setdumbbellsSource(dumbbells_y);setcablesSource(cables_y);setpreacherSource(preacher_y); setbankjesSource(bankjes_y);setringSource(ring_y);setgewichten1Source(gewichten1_y); setgewichten2Source(gewichten2_y); setzak_topSource(zak_top_y); setzak_middenSource(zak_midden_y); setzak_onderSource(zak_onder_y); setyogamatSource(yogamat_y);setbenchpressSource(benchpress_y); setdeadliftSource(deadlift_y);}
    const disableAnimationNextPlayer = () =>{
      setshowAnimationNextPlayer(false);
      //waveFunction(color);
      if(color === 'red' && waveEffect){setmiddleColor(styles.middleR)}
      else if(color === 'blue' && waveEffect){setmiddleColor(styles.middleB)}
      else if(color === 'green' && waveEffect){setmiddleColor(styles.middleG)}
      else if(color === 'yellow' && waveEffect){setmiddleColor(styles.middleY)}
      else{setmiddleColor(styles.middle)}
    }
    setTimeout(disableAnimationNextPlayer, 3000);
  }

  const runFunctionNextPlayer = (color) =>{
    //Next player
    swipeNextPlayer(color);
  }
  const [showMoneyAnimation, setshowMoneyAnimation] = useState(false);
  const [showJailAnimation, setshowJailAnimation] = useState(false);
  const [showDiceAnimation, setshowDiceAnimation] = useState(false);
  const [showAnimationNextPlayer, setshowAnimationNextPlayer] = useState(false);
  const [colorAnimationNextPlayer, setcolorAnimationNextPlayer] = useState(nxtP0);
  const [diceNumber, setdiceNumber] = useState(DiceTop_1);
  const [soundEffect, setsoundEffect] = useState(PlayerJoins);
  const [playSoundEffect, setplaySoundEffect] = useState(false);

  const nextPOptions = {
      loop: true,
      autoplay: true,
      animationData: colorAnimationNextPlayer,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
  };

  const boardDice = {
      loop: true,
      autoplay: true,
      animationData: diceNumber,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
  };

  const boardJail = {
      loop: true,
      autoplay: true,
      animationData: JailFalling,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
  };

  const boardMoney = {
      loop: true,
      autoplay: true,
      animationData: MoneyRain,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
  };

    const [turnPlayer, setturnPlayer] = useState('Player0');
    const [playerStatus, setplayerStatus] = useState('SOLID EFFECT');
  useEffect(()=>{
    socket.on('receive_playerTurn', (playerTurn)=>{
      setturnPlayer(playerTurn);
      if(ableNext){
        console.log('hierin');
        ableNext = false;
        if(playerTurn === 'Player0'){colorAni = 'red';}
        else if(playerTurn === 'Player1'){colorAni = 'blue';}
        else if(playerTurn === 'Player2'){colorAni = 'green';}
        else if(playerTurn === 'Player3'){colorAni = 'yellow';}
        runFunctionNextPlayer(colorAni);

      }
    })

    socket.on('receive_rolledDice', (diceNumber)=>{

      if(diceNumber === 1){setdiceNumber(DiceTop_1);}
      else if(diceNumber === 2){setdiceNumber(DiceTop_2);}
      else if(diceNumber === 3){setdiceNumber(DiceTop_3);}
      else if(diceNumber === 4){setdiceNumber(DiceTop_4);}
      else if(diceNumber === 5){setdiceNumber(DiceTop_5);}
      else if(diceNumber === 6){setdiceNumber(DiceTop_6);}
      setshowDiceAnimation(true);
       const disableDiceAnimation = () =>{
        setshowDiceAnimation(false);
      }
      setTimeout(disableDiceAnimation, 10000);
      setplayerStatus('DICE ANIMATION');

      const walkingDiceDone = () =>{
        
        waveEffect = false;
        waveActive = false;
        ableNext = true;
        console.log('stopped walking');
        setplayerStatus('SOLID EFFECT');
        if(colorAni === 'red'){setmiddleColor(styles.middleR);setcolorAnimationNextPlayer(nxtP0);setdumbbellsSource(dumbbells_r);setcablesSource(cables_r);setpreacherSource(preacher_r); setbankjesSource(bankjes_r);setringSource(ring_r);setgewichten1Source(gewichten1_r); setgewichten2Source(gewichten2_r); setzak_topSource(zak_top_r); setzak_middenSource(zak_midden_r); setzak_onderSource(zak_onder_r); setyogamatSource(yogamat_r);setbenchpressSource(benchpress_r); setdeadliftSource(deadlift_r);}
        if(colorAni === 'blue'){setmiddleColor(styles.middleB);setcolorAnimationNextPlayer(nxtP1);setdumbbellsSource(dumbbells_b);setcablesSource(cables_b);setpreacherSource(preacher_b); setbankjesSource(bankjes_b);setringSource(ring);setgewichten1Source(gewichten1_b); setgewichten2Source(gewichten2_b); setzak_topSource(zak_top_b); setzak_middenSource(zak_midden_b); setzak_onderSource(zak_onder_b); setyogamatSource(yogamat_b);setbenchpressSource(benchpress_b); setdeadliftSource(deadlift_b);}
        if(colorAni === 'green'){setmiddleColor(styles.middleG);setcolorAnimationNextPlayer(nxtP2);setdumbbellsSource(dumbbells_g);setcablesSource(cables_g);setpreacherSource(preacher_g); setbankjesSource(bankjes_g);setringSource(ring_g);setgewichten1Source(gewichten1_g); setgewichten2Source(gewichten2_g); setzak_topSource(zak_top_g); setzak_middenSource(zak_midden_g); setzak_onderSource(zak_onder_g); setyogamatSource(yogamat_g);setbenchpressSource(benchpress_g); setdeadliftSource(deadlift_g);}
        if(colorAni === 'yellow'){setmiddleColor(styles.middleY);setcolorAnimationNextPlayer(nxtP3);setdumbbellsSource(dumbbells_y);setcablesSource(cables_y);setpreacherSource(preacher_y); setbankjesSource(bankjes_y);setringSource(ring_y);setgewichten1Source(gewichten1_y); setgewichten2Source(gewichten2_y); setzak_topSource(zak_top_y); setzak_middenSource(zak_midden_y); setzak_onderSource(zak_onder_y); setyogamatSource(yogamat_y);setbenchpressSource(benchpress_y); setdeadliftSource(deadlift_y);}
      }
      const animationDiceDone = () =>{
        
        console.log('rolled dice')
        setplayerStatus('WAVE EFFECT');
        waveEffect = true;
        if(!waveActive){waveFunction(colorAni);}
        setTimeout(walkingDiceDone, 10000);
      }
     
      
      setTimeout(animationDiceDone, 2200);
    })

    socket.on('receive_toJail', ()=>{
      playSound = true;
      if(playSound){
        playSound = false;
        setsoundEffect(JailDoor)
        setplaySoundEffect(true);

        const enableSound = () =>{
          playSound = true;
          setplaySoundEffect(false);
        }
        setTimeout(enableSound, 2000);
      }

      setshowJailAnimation(true);
      const disableJailAnimation = () =>{
        setshowJailAnimation(false);
      }
      setTimeout(disableJailAnimation, 9999);
    })

    socket.on('receive_start', ()=>{

      playSound = true;
      if(playSound){
        playSound = false;
        setsoundEffect(ComesMoney)
        setplaySoundEffect(true);

        const enableSound = () =>{
          playSound = true;
          setplaySoundEffect(false);
        }
        setTimeout(enableSound, 2000);
      }

      setshowMoneyAnimation(true);
      const disableMoneyAnimation = () =>{
        setshowMoneyAnimation(false);
      }
      setTimeout(disableMoneyAnimation, 4500);
    })

    socket.on('end_game', ()=>{
      playSound = true;
      if(playSound){
        playSound = false;
        setsoundEffect(EndGame)
        setplaySoundEffect(true);

        const enableSound = () =>{
          playSound = true;
          setplaySoundEffect(false);
        }
        setTimeout(enableSound, 2000);
      }
    })

    socket.on('receive_doneCard', ()=>{
      playSound = true;
      if(playSound){
        playSound = false;
        setsoundEffect(CardDone)
        setplaySoundEffect(true);

        const enableSound = () =>{
          playSound = true;
          setplaySoundEffect(false);
        }
        setTimeout(enableSound, 2000);
      }
    })

    socket.on('receive_soldItem', ()=>{
      playSound = true;
      if(playSound){
        playSound = false;
        setsoundEffect(SoldProperty)
        setplaySoundEffect(true);

        const enableSound = () =>{
          playSound = true;
          setplaySoundEffect(false);
        }
        setTimeout(enableSound, 2000);
      }
    })
  })

    return (
      <div>
        {playSoundEffect ? <MultiPlayer urls={[soundEffect]}/> : ''}
        {showMoneyAnimation ? <div><Lottie className={styles.stopwatch_image} options={boardMoney} style={{height:'100%', position:'absolute', zIndex:5, left:0}}/><Lottie className={styles.stopwatch_image} options={boardMoney} style={{height:'100%', position:'absolute', zIndex:5, left:'50%'}}/></div> : ''}
        {showJailAnimation ? <Lottie className={styles.stopwatch_image} options={boardJail} style={{width:'100%', position:'absolute', zIndex:5}}/> : ''}
        {showDiceAnimation ? <Lottie className={styles.stopwatch_image} options={boardDice} style={{width:'100%', position:'absolute', zIndex:5}}/> : ''}
        {showAnimationNextPlayer ? <Lottie className={styles.stopwatch_image} options={nextPOptions} style={{width:'100%', position:'absolute', zIndex:5}}/> : ''}
        <div className={styles.rdndf}>
          <p>Turn: {turnPlayer}</p>
          <p>Status: {playerStatus}</p>
          {/* <p>Player 1 {pos1}</p>
          <p>Player 2 {pos2}</p>
          <p>Player 3 {pos3}</p>
          <p>Player 4 {pos4}</p> */}
        </div>
        
        <div className={styles.drawing} style={{opacity: 1}}>
          <img className={styles.ring} src={ringSource} alt="img"/>
          <img className={styles.oxygen} src={oxygenSource} alt="img"/>
          <img className={styles.basicfit} src={basicfitSource} alt="img"/>
          <img className={styles.bankjes} src={bankjesSource} alt="img"/>
          <img className={styles.benchpress} src={benchpressSource} alt="img"/>
          <img className={styles.cables} src={cablesSource} alt="img"/>
          <img className={styles.deadlift} src={deadliftSource} alt="img"/>
          <img className={styles.dumbbells} src={dumbbellsSource} alt="img"/>
          <img className={styles.gewichten1} src={gewichten1Source} alt="img"/>
          <img className={styles.gewichten2} src={gewichten2Source} alt="img"/>
          <img className={styles.preacher} src={preacherSource} alt="img"/>
          <img className={styles.yogamat} src={yogamatSource} alt="img"/>
          <img className={styles.zak_top} src={zak_topSource} alt="img"/>
          <img className={styles.zak_midden} src={zak_middenSource} alt="img"/>
          <img className={styles.zak_onder} src={zak_onderSource} alt="img"/>
        </div>
        {/* <img style={{opacity:1, zIndex:9999999999999999}} className={styles.boarddesign} src={boarddesign} alt="board design"/> */}

            <div className={styles.players}>
              {
              playerAmount === 2 ?
              <div>
                <div style={X1_P1 !== -1 ? { bottom: (X1_P1*3.2)+'px', right: (Y1_P1*4.94 - 130)+'px', zIndex: 10000000000} : { top: (X_P1*3.5 + 20)+'px', left: (Y_P1*4.94 - 200)+'px', zIndex: 10000000000}} className={styles.player_one}></div>
              </div>
              :
              playerAmount === 3 ?
              <div>
                <div style={X1_P1 !== -1 ? { bottom: (X1_P1*3.2)+'px', right: (Y1_P1*4.94 - 130)+'px', zIndex: 10000000000} : { top: (X_P1*3.5 + 20)+'px', left: (Y_P1*4.94 - 200)+'px', zIndex: 10000000000}} className={styles.player_one}></div>
                <div style={X1_P2 !== -1 ? { bottom: (X1_P2*3.2)+'px', right: (Y1_P2*4.94 - 130)+'px', zIndex: 10000000000} : { top: (X_P2*3.5 + 20)+'px', left: (Y_P2*4.94 - 200)+'px', zIndex: 10000000000}} className={styles.player_two}></div>
              </div> 
              :
              playerAmount === 4 ?
              <div>
                <div style={X1_P1 !== -1 ? { bottom: (X1_P1*3.2)+'px', right: (Y1_P1*4.94 - 130)+'px', zIndex: 10000000000} : { top: (X_P1*3.5 + 20)+'px', left: (Y_P1*4.94 - 200)+'px', zIndex: 10000000000}} className={styles.player_one}></div>
                <div style={X1_P2 !== -1 ? { bottom: (X1_P2*3.2)+'px', right: (Y1_P2*4.94 - 130)+'px', zIndex: 10000000000} : { top: (X_P2*3.5 + 20)+'px', left: (Y_P2*4.94 - 200)+'px', zIndex: 10000000000}} className={styles.player_two}></div>
                <div style={X1_P3 !== -1 ? { bottom: (X1_P3*3.2)+'px', right: (Y1_P3*4.94 - 130)+'px', zIndex: 10000000000} : { top: (X_P3*3.5 + 20)+'px', left: (Y_P3*4.94 - 200)+'px', zIndex: 10000000000}} className={styles.player_three}></div>
              </div>
              :
              playerAmount === 5 ?
              <div>
                <div style={X1_P1 !== -1 ? { bottom: (X1_P1*3.2)+'px', right: (Y1_P1*4.94 - 130)+'px', zIndex: 10000000000} : { top: (X_P1*3.5 + 20)+'px', left: (Y_P1*4.94 - 200)+'px', zIndex: 10000000000}} className={styles.player_one}></div>
                <div style={X1_P2 !== -1 ? { bottom: (X1_P2*3.2)+'px', right: (Y1_P2*4.94 - 130)+'px', zIndex: 10000000000} : { top: (X_P2*3.5 + 20)+'px', left: (Y_P2*4.94 - 200)+'px', zIndex: 10000000000}} className={styles.player_two}></div>
                <div style={X1_P3 !== -1 ? { bottom: (X1_P3*3.2)+'px', right: (Y1_P3*4.94 - 130)+'px', zIndex: 10000000000} : { top: (X_P3*3.5 + 20)+'px', left: (Y_P3*4.94 - 200)+'px', zIndex: 10000000000}} className={styles.player_three}></div>
                <div style={X1_P4 !== -1 ? { bottom: (X1_P4*3.2)+'px', right: (Y1_P4*4.94 - 130)+'px', zIndex: 10000000000} : { top: (X_P4*3.5 + 20)+'px', left: (Y_P4*4.94 - 200)+'px', zIndex: 10000000000}} className={styles.player_four}></div>
              </div>
              : ''
              } 
            </div>

           <div className={styles.board}>

              <canvas className={middleColor}></canvas>

              {playerAmount-1 > 0 ? <canvas ref={gradientP1} style={{background: backgroundP1, opacity: 0.2}} className={styles.playerOne_gradient}></canvas> : ''}
              {playerAmount-1 > 1 ? <canvas ref={gradientP2} style={{background: backgroundP2, opacity: 0.2}} className={styles.playerTwo_gradient}></canvas> : ''}
              {playerAmount-1 > 2 ? <canvas ref={gradientP3} style={{background: backgroundP3, opacity: 0.2}} className={styles.playerThree_gradient}></canvas> : ''}
              {playerAmount-1 > 3 ? <canvas ref={gradientP4} style={{background: backgroundP4, opacity: 0.2}} className={styles.playerFour_gradient}></canvas> : ''}

              <div style={{opacity:0}} className={styles.cam1}>
                {/* <p style={{color:'white', fontSize:20+'px'}}>P1 {X_P1}/{Y_P1} || {X1_P1}/{Y1_P1}</p> */}
                {/* <p style={{color:'white'}}>P2 {X_P2}/{Y_P2} || {X1_P2}/{Y1_P2}</p>
                <p style={{color:'white'}}>P2 {X_P3}/{Y_P3} || {X1_P3}/{Y1_P3}</p>
                <p style={{color:'white'}}>P2 {X_P4}/{Y_P4} || {X1_P4}/{Y1_P4}</p> */}
                {/* <p style={{color:'white', fontSize:20+'px'}}>P1 {pos1}</p> */}
                {/* <p style={{color:'white', fontSize:20+'px'}}>P2 {pos2}</p>
                <p style={{color:'white', fontSize:20+'px'}}>P3 {pos3}</p>
                <p style={{color:'white', fontSize:20+'px'}}>P4 {pos4}</p> */}
                {playerAmount > 1 ? <p className={styles.position}>P1 {pos1}</p> : ''}
                {playerAmount > 2 ? <p className={styles.position}>P2 {pos2}</p> : ''}
                
                <video id="video" autoPlay style={{display: 'none' }}></video>
                <canvas id="canvas" style={{width:640/1.5+'px', height:480/1.5+'px'}}></canvas>
              </div>
              <div style={{opacity:0}} className={styles.cam2}>

                {playerAmount > 3 ? <p className={styles.position}>P3 {pos3}</p> : ''} 
                {playerAmount > 4 ? <p className={styles.position}>P4 {pos4}</p> : ''} 
                
                <video id="video1" autoPlay style={{display: 'none' }}></video>
                <canvas id="canvas1" style={{width:640/2+'px', height:480/2+'px'}}></canvas>
              </div>

               <div className={stylesDesign.zero}><img src={board_start} alt="start"/></div>
                <div className={stylesDesign.one}><section><p>$60</p><p>Pull-up</p></section><div></div></div>
                <div className={stylesDesign.two}><img className={stylesDesign.kettlebellTop} alt="card" src={kettlebell}/></div>
                <div className={stylesDesign.three}><section><p>$60</p><p>Push-up</p></section><div></div></div>
                <div className={stylesDesign.four}><section><p>$100</p><p>Lat pulldown</p></section><div></div></div>
                <div className={stylesDesign.five}><img className={stylesDesign.stationTop} src={station} alt="station"/></div>
                <div className={stylesDesign.six}><p>$200</p><p>Taxes</p><img className={stylesDesign.moneybagTop} src={moneybag} alt="money bag"/></div>
                <div className={stylesDesign.seven}><section><p>$100</p><p>Cable row</p></section><div></div></div>
                <div className={stylesDesign.eight}><section><p>$100</p><p>Bent over row</p></section><div></div></div>
                <div className={stylesDesign.nine}><img className={stylesDesign.jail} src={board_jail} alt="jail"/></div>
                <div className={stylesDesign.ten}><div></div><section><p>Skullcrusher</p><p>$140</p></section></div>
                <div className={stylesDesign.eleven}><div></div><section><p>Rope pushdown</p><p>$140</p></section></div>
                <div className={stylesDesign.twelve}><img className={stylesDesign.kettlebellRight} alt="card" src={kettlebell}/></div>
                <div className={stylesDesign.thirteen}><div></div><section><p>Tricep dips</p><p>$160</p></section></div>
                <div className={stylesDesign.fourteen}><img src={board_bed} alt="bed"/></div>
                <div className={stylesDesign.fifteen}><div></div><section><p>Lateral raise</p><p>$180</p></section></div>
                <div className={stylesDesign.sixteen}><div></div><section><p>Shoulder press</p><p>$180</p></section></div>
                <div className={stylesDesign.seventeen}><img className={stylesDesign.kettlebellBottom} alt="card" src={kettlebell}/></div>
                <div className={stylesDesign.eightteen}><div></div><section><p>Upright row</p><p>$200</p></section></div>
                <div className={stylesDesign.nineteen}><img className={stylesDesign.stationBottom} src={station} alt="station"/></div>
                <div className={stylesDesign.twenty}><div></div><section><p>Hammer curl</p><p>$220</p></section></div>
                <div className={stylesDesign.twentyone}><img className={stylesDesign.moneybagBottom} src={moneybag} alt="money bag"/><p>Taxes</p><p>$200</p></div>
                <div className={stylesDesign.twentytwo}><div></div><section><p>Reverse curl</p><p>$220</p></section></div>
                <div className={stylesDesign.twentythree}><img src={board_tojail} alt="to jail"/></div>
                <div className={stylesDesign.twentyfour}><section><p>Squat</p><p>$240</p></section><div></div></div>
                <div className={stylesDesign.twentyfive}><section><p>Leg curl</p><p>$260</p></section><div></div></div>
                <div className={stylesDesign.twentysix}><img className={stylesDesign.kettlebellLeft} alt="card" src={kettlebell}/></div>
                <div className={stylesDesign.twentyseven}><section><p>Hip thrust</p><p>$260</p></section><div></div></div>
           </div>
           <script src="../scripts/script.js"></script>
       </div> 
    )
}