const WebSocket = require('ws');                // 引入 ws
globalThis.WebSocket = WebSocket;               // 挂载到全局

const { KittenCloudFunction } = require('kitten-cloud-function');

const WORK_ID = process.env.WORK_ID;
const VAR_NAME = process.env.VAR_NAME || '测试';
const TRIGGER_TEXT = '你好呀';
const NEW_TEXT = '你好';

async function main() {
  const cloudFunc = new KittenCloudFunction();
  await cloudFunc.connect(WORK_ID);

  const currentValue = await cloudFunc.getCloudVariable(VAR_NAME);
  console.log(`当前 "${VAR_NAME}" 的值: "${currentValue}"`);

  if (currentValue === TRIGGER_TEXT) {
    console.log('检测到触发文字，正在修改...');
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