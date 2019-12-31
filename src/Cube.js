/*
 * @Description: 小方块
 * @Author: travelclover(travelclover@163.com)
 * @Date: 2019-12-31 10:05:51
 */
import * as THREE from 'three';
import config from './config.js';

class Cube {
  constructor(props) {
    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.cubeBackgroundColor),
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    group.add(cube);

    props.colors.forEach((color, index) => {
      if (color) {
        let plane = null;
        const planeGeometry = new THREE.PlaneGeometry(0.95, 0.95);
        const planeMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          polygonOffset: true, // 是否使用多边形偏移
          polygonOffsetFactor: -1, // 设置多边形偏移因子
          polygonOffsetUnits: 1.0, // 设置多边形偏移量单位
          side: THREE.DoubleSide,
        });
        plane = new THREE.Mesh(planeGeometry, planeMaterial);
        if (index === 0) {
          plane.position.set(0.501, 0, 0);
          plane.rotation.y = Math.PI / 2;
        } else if (index === 1) {
          plane.position.set(-0.501, 0, 0);
          plane.rotation.y = Math.PI / 2;
        } else if (index === 2) {
          plane.position.set(0, 0.501, 0);
          plane.rotation.x = Math.PI / 2;
        } else if (index === 3) {
          plane.position.set(0, -0.501, 0);
          plane.rotation.x = Math.PI / 2;
        } else if (index === 4) {
          plane.position.set(0, 0, 0.501);
        } else if (index === 5) {
          plane.position.set(0, 0, -0.501);
        }
        group.add(plane);
      }
    });
    group.position.set(props.x, props.y, props.z);
    this.object = group;
  }
}

export default Cube;
