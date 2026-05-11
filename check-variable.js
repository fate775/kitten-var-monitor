const { KittenCloudFunction } = require('kitten-cloud-function');

async function main() {
  const workId = process.env.WORK_ID;
  const varName = process.env.VAR_NAME || '测试';

  // 1. 创建连接（直接传入作品ID，不需要 connect）
  const cloud = new KittenCloudFunction(workId);

  // 2. 获取公有云变量实例
  const variable = await cloud.publicVariable.get(varName);

  // 3. 读取当前值
  const currentValue = variable.get();
  console.log(`当前 "${varName}" 的值: "${currentValue}"`);

  // 4. 判断并修改
  if (currentValue === '你好呀') {
    console.log('检测到触发文字，正在修改...');
    await variable.set('你好');
    console.log('修改成功：你好呀 → 你好');
  } else {
    console.log('未触发，不执行操作');
  }
}

main().catch(err => {
  console.error('脚本出错:', err);
  process.exit(1);
});