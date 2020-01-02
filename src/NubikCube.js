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

    this.animate();

    this.updateObjects('U', Math.PI / 2);
    this.transformCubes('U');
    // this.updateObjects('R', Math.PI / 4);

    // R' 循环
    let angle = 0;
    setInterval(() => {
      angle += Math.PI / 2 / (0.5 * 1000);
      this.updateObjects('-R', angle);
    }, 1000 / 60)
  }

  updateObjects(type, angle) {
    if (type.charAt(0) !== '-') { // 逆时针旋转
      angle = -angle;
    }
    if (type.charAt(type.length - 1) === 'F') { // 前层
      //
    } else if (type.charAt(type.length - 1) === 'U') { // 上层
      this.cubes[0][2][0].rotation.y = angle;
      this.cubes[0][2][0].position.x = Math.sqrt(2) * Math.sin(Math.PI * 5 / 4 + angle);
      this.cubes[0][2][0].position.z = Math.sqrt(2) * Math.cos(Math.PI * 5 / 4 + angle);
      this.cubes[1][2][0].rotation.y = angle;
      this.cubes[1][2][0].position.x = Math.sin(Math.PI + angle);
      this.cubes[1][2][0].position.z = Math.cos(Math.PI + angle);
      this.cubes[2][2][0].rotation.y = angle;
      this.cubes[2][2][0].position.x = Math.sqrt(2) * Math.sin(Math.PI * 3 / 4 + angle);
      this.cubes[2][2][0].position.z = Math.sqrt(2) * Math.cos(Math.PI * 3 / 4 + angle);
      this.cubes[0][2][1].rotation.y = angle;
      this.cubes[0][2][1].position.x = Math.sin(Math.PI * 3 / 2 + angle);
      this.cubes[0][2][1].position.z = Math.cos(Math.PI * 3 / 2 + angle);
      this.cubes[1][2][1].rotation.y = angle;
      this.cubes[2][2][1].rotation.y = angle;
      this.cubes[2][2][1].position.x = Math.sin(Math.PI * 1 / 2 + angle);
      this.cubes[2][2][1].position.z = Math.cos(Math.PI * 1 / 2 + angle);
      this.cubes[0][2][2].rotation.y = angle;
      this.cubes[0][2][2].position.x = Math.sqrt(2) * Math.sin(Math.PI * 7 / 4 + angle);
      this.cubes[0][2][2].position.z = Math.sqrt(2) * Math.cos(Math.PI * 7 / 4 + angle);
      this.cubes[1][2][2].rotation.y = angle;
      this.cubes[1][2][2].position.x = Math.sin(angle);
      this.cubes[1][2][2].position.z = Math.cos(angle);
      this.cubes[2][2][2].rotation.y = angle;
      this.cubes[2][2][2].position.x = Math.sqrt(2) * Math.sin(Math.PI * 1 / 4 + angle);
      this.cubes[2][2][2].position.z = Math.sqrt(2) * Math.cos(Math.PI * 1 / 4 + angle);
    } else if (type.charAt(type.length - 1) === 'R') { // R 右层
      this.cubes[2][2][2].rotation.x = angle;
      this.cubes[2][2][2].position.y = Math.sqrt(2) * Math.cos(Math.PI * 1 / 4 + angle);
      this.cubes[2][2][2].position.z = Math.sqrt(2) * Math.sin(Math.PI * 1 / 4 + angle);
      this.cubes[2][2][1].rotation.x = angle;
      this.cubes[2][2][1].position.y = Math.cos(angle);
      this.cubes[2][2][1].position.z = Math.sin(angle);
      this.cubes[2][2][0].rotation.x = angle;
      this.cubes[2][2][0].position.y = Math.sqrt(2) * Math.cos(angle - Math.PI * 1 / 4);
      this.cubes[2][2][0].position.z = Math.sqrt(2) * Math.sin(angle - Math.PI * 1 / 4);
      this.cubes[2][1][2].rotation.x = angle;
      this.cubes[2][1][2].position.y = Math.cos(Math.PI * 1 / 2 + angle);
      this.cubes[2][1][2].position.z = Math.sin(Math.PI * 1 / 2 + angle);
      this.cubes[2][1][1].rotation.x = angle;
      this.cubes[2][1][0].rotation.x = angle;
      this.cubes[2][1][0].position.y = Math.cos(angle - Math.PI * 1 / 2);
      this.cubes[2][1][0].position.z = Math.sin(angle - Math.PI * 1 / 2);
      this.cubes[2][0][2].rotation.x = angle;
      this.cubes[2][0][2].position.y = Math.sqrt(2) * Math.cos(Math.PI * 3 / 4 + angle);
      this.cubes[2][0][2].position.z = Math.sqrt(2) * Math.sin(Math.PI * 3 / 4 + angle);
      this.cubes[2][0][1].rotation.x = angle;
      this.cubes[2][0][1].position.y = Math.cos(angle + Math.PI);
      this.cubes[2][0][1].position.z = Math.sin(angle + Math.PI);
      this.cubes[2][0][0].rotation.x = angle;
      this.cubes[2][0][0].position.y = Math.sqrt(2) * Math.cos(angle - Math.PI * 3 / 4);
      this.cubes[2][0][0].position.z = Math.sqrt(2) * Math.sin(angle - Math.PI * 3 / 4);
    }
  }

  /**
   * 数组变换
   * @param {string} type 转换类型
   */
  transformCubes(type) {
    let temp = null;
    if (type === 'U') { // 上层顺时针
      temp = this.cubes[0][2][0];
      this.cubes[0][2][0] = this.cubes[0][2][2];
      this.cubes[0][2][2] = this.cubes[2][2][2];
      this.cubes[2][2][2] = this.cubes[2][2][0];
      this.cubes[2][2][0] = temp;
      temp = this.cubes[1][2][0];
      this.cubes[1][2][0] = this.cubes[0][2][1];
      this.cubes[0][2][1] = this.cubes[1][2][2];
      this.cubes[1][2][2] = this.cubes[2][2][1];
      this.cubes[2][2][1] = temp;
    } else if (type === '-U') { // 上层逆时针
      temp = this.cubes[2][2][0];
      this.cubes[2][2][0] = this.cubes[2][2][2];
      this.cubes[2][2][2] = this.cubes[0][2][2];
      this.cubes[0][2][2] = this.cubes[0][2][0];
      this.cubes[0][2][0] = temp;
      temp = this.cubes[2][2][1];
      this.cubes[2][2][1] = this.cubes[1][2][2];
      this.cubes[1][2][2] = this.cubes[0][2][1];
      this.cubes[0][2][1] = this.cubes[1][2][0];
      this.cubes[1][2][0] = temp;
    } else if (type === 'R') { // 右层顺时针
      temp = this.cubes[2][2][0];
      this.cubes[2][2][0] = this.cubes[2][2][2];
      this.cubes[2][2][2] = this.cubes[0][2][2];
      this.cubes[0][2][2] = this.cubes[0][2][0];
      this.cubes[0][2][0] = temp;
      temp = this.cubes[2][2][1];
      this.cubes[2][2][1] = this.cubes[1][2][2];
      this.cubes[1][2][2] = this.cubes[0][2][1];
      this.cubes[0][2][1] = this.cubes[1][2][0];
      this.cubes[1][2][0] = temp;
    } else if (type === '-R') { // 右层逆时针
      temp = this.cubes[0][2][0];
      this.cubes[0][2][0] = this.cubes[0][2][2];
      this.cubes[0][2][2] = this.cubes[2][2][2];
      this.cubes[2][2][2] = this.cubes[2][2][0];
      this.cubes[2][2][0] = temp;
      temp = this.cubes[1][2][0];
      this.cubes[1][2][0] = this.cubes[0][2][1];
      this.cubes[0][2][1] = this.cubes[1][2][2];
      this.cubes[1][2][2] = this.cubes[2][2][1];
      this.cubes[2][2][1] = temp;
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const cube = this.cubes[x][y][z];
          cube.object.rotation.x = cube.rotation.x;
          cube.object.rotation.y = cube.rotation.y;
          cube.object.rotation.z = cube.rotation.z;
          cube.object.position.x = cube.position.x;
          cube.object.position.y = cube.position.y;
          cube.object.position.z = cube.position.z;
        }
      }
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
