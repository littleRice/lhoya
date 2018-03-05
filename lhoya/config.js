const fs = require('fs');

const path = require('path');
const libDev = './lib';
const root = './src/components';
//重新建立lib/const文件夹
let entrys = {};

function deleteFiles(path) {  
  var files = [];  
  if(fs.existsSync(path)) {  
    files = fs.readdirSync(path);  
    files.forEach(function(file, index) {  
        var curPath = path + "/" + file;  
        if(fs.statSync(curPath).isDirectory()) { // recurse  
            deleteFiles(curPath);  
        } else { // delete file  
            fs.unlinkSync(curPath);  
        }
    });  
    fs.rmdirSync(path);
  }
};
deleteFiles(`./lib`);
deleteFiles(`./dist`);

fs.mkdirSync('./lib');
fs.mkdirSync('./lib/less');

/*const fsPath = require('fs-path');
const roots = path.join(__dirname);  // 工作根目录
fsPath.remove(path.join(roots, 'lib'), () => {
  fsPath.remove(path.join(roots, 'dist'), () => {
    fs.mkdirSync('./lib');
    fs.mkdirSync('./lib/const');
  });
});*/


const pluginsContent = fs.readFileSync(`${root}/plugins.less`);

let fileList = fs.readdirSync(`${root}`);
fileList.forEach((v)=> {
  let path = `${root}/${v}`;
  if(fs.lstatSync(path).isDirectory()) {
    let list = fs.readdirSync(path);
    let con = '';
    list.forEach(el => {
      if(el.match(/\.less$/)) {
        con += fs.readFileSync(`${path}/${el}`) + '\n' + pluginsContent;
      }
    });
    fs.writeFile(`${libDev}/less/lhoya-${v}.less`,con);
    fs.writeFile(`${libDev}/${v}.index.js`, `import './less/lhoya-${v}.less';`);
    entrys[v] = `./lib/${v}.index.js`;
  }
});
module.exports = entrys;