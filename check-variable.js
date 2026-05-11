const { KittenCloudFunction } = require('kitten-cloud-function');

const WORK_ID = process.env.WORK_ID;          // 从 GitHub Secrets 传入
const VAR_NAME = process.env.VAR_NAME || '测试'; // 云变量名，默认“测试”
const TRIGGER_TEXT = '你好呀';
const NEW_TEXT = '你好';

async function main() {
  const cloudFunc = new KittenCloudFunction();
  // 如果公有云变量不需要认证，可以省略 token
  if (process.env.TOKEN) {
    // 假设库有 setToken 方法，根据实际 API 调整
    // cloudFunc.setToken(process.env.TOKEN);
  }
  await cloudFunc.connect(WORK_ID);

  const currentValue = await cloudFunc.getCloudVariable(VAR_NAME);
  console.log(`当前 "${VAR_NAME}" 的值: "${currentValue}"`);

  if (currentValue === TRIGGER_TEXT) {
    console.log(`检测到触发文字，正在修改...`);
    await cloudFunc.setCloudVariable(VAR_NAME, NEW_TEXT);
    console.log(`修改成功：${TRIGGER_TEXT} → ${NEW_TEXT}`);
  } else {
    console.log('未触发，不执行操作');
  }
}

main().catch(err => {
  console.error('脚本出错:', err);
  process.exit(1);
});