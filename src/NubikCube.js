/*
 * @Description: 魔方
 * @Author: travelclover(travelclover@163.com)
 * @Date: 2019-12-31 10:20:03
 */
import Cube from './Cube.js';
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
    console.log(this.cubes)
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
