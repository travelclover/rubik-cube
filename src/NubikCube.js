/*
 * @Description: 魔方
 * @Author: travelclover(travelclover@163.com)
 * @Date: 2019-12-31 10:20:03
 */
import Cube from './Cube.js';
import * as THREE from 'three';
import config from './config.js';

class NubikCube {
  constructor(scene, camera, renderer) {
    this.scene = scene; // 场景
    this.camera = camera; // 相机
    this.renderer = renderer; // 渲染器

    this.cubes = [
      [[], [], []],
      [[], [], []],
      [[], [], []],
    ];

    this.init();
  }

  // 初始化
  init() {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const colors = getColors(x, y, z);
          const cube = new Cube({
            x: x - 1,
            y: y - 1,
            z: z - 1,
            colors,
          });
          this.cubes[x][y][z] = cube;
          this.scene.add(cube.object);
        }
      }
    }

    // R' 循环
    let angle = 0;
    setInterval(() => {
      angle += Math.PI / 2 / (1000 / 24) * 2;
      this.updateObjects('-R', angle);
    }, 1000 / 24)
  }

  updateObjects(type, angle) {
    if (type === '-R') { // R'
      this.cubes[2][2][2].object.rotation.x = angle;
      this.cubes[2][2][2].object.position.set(1, Math.sqrt(2) * Math.cos(Math.PI * 1 / 4 + angle), Math.sqrt(2) * Math.sin(Math.PI * 1 / 4 + angle));
      this.cubes[2][2][1].object.rotation.x = angle;
      this.cubes[2][2][1].object.position.set(1, Math.cos(angle), Math.sin(angle));
      this.cubes[2][2][0].object.rotation.x = angle;
      this.cubes[2][2][0].object.position.set(1, Math.sqrt(2) * Math.cos(angle - Math.PI * 1 / 4), Math.sqrt(2) * Math.sin(angle - Math.PI * 1 / 4));
      this.cubes[2][1][2].object.rotation.x = angle;
      this.cubes[2][1][2].object.position.set(1, Math.cos(Math.PI * 1 / 2 + angle), Math.sin(Math.PI * 1 / 2 + angle));
      this.cubes[2][1][1].object.rotation.x = angle;
      this.cubes[2][1][0].object.rotation.x = angle;
      this.cubes[2][1][0].object.position.set(1, Math.cos(angle - Math.PI * 1 / 2), Math.sin(angle - Math.PI * 1 / 2));
      this.cubes[2][0][2].object.rotation.x = angle;
      this.cubes[2][0][2].object.position.set(1, Math.sqrt(2) * Math.cos(Math.PI * 3 / 4 + angle), Math.sqrt(2) * Math.sin(Math.PI * 3 / 4 + angle));
      this.cubes[2][0][1].object.rotation.x = angle;
      this.cubes[2][0][1].object.position.set(1, Math.cos(angle + Math.PI), Math.sin(angle + Math.PI));
      this.cubes[2][0][0].object.rotation.x = angle;
      this.cubes[2][0][0].object.position.set(1, Math.sqrt(2) * Math.cos(angle - Math.PI * 3 / 4), Math.sqrt(2) * Math.sin(angle - Math.PI * 3 / 4));
    }
  }
}

/**
 * 获取每个小立方体六个面得颜色
 * @param {number} x x坐标
 * @param {number} y y坐标
 * @param {number} z z坐标
 * @returns {array} 返回6个面得颜色数组
 */
function getColors(x, y, z) {
  const colors = new Array(6).fill(null);
  if (x === 0) {
    colors[1] = 0xff6a00; // 橘
  }
  if (x === 2) {
    colors[0] = 0xff0000; // 红
  }
  if (y === 0) {
    colors[3] = 0xffffff; // 白
  }
  if (y === 2) {
    colors[2] = 0xffeb3b; // 黄
  }
  if (z === 0) {
    colors[5] = 0x4bff4b; // 绿
  }
  if (z === 2) {
    colors[4] = 0x2196f3; // 蓝
  }
  return colors;
}

export default NubikCube;
