import colors, { Color } from 'colors';


const showMessage = (color:Color,...message: any[]) => {

  const messageJoin = message.map((m) => {
    return typeof m === 'string' ? m : JSON.stringify(m);
  }).join(' ');
  console.log(color(messageJoin));
}

export const showInfo = (...message: any[]) => {
  showMessage(colors.blue.bold, ...message);
}

export const showError = (...message: any[]) => {
  showMessage(colors.red.bold, ...message);
}

export const showSuccess = (...message: any[]) => {
  showMessage(colors.green.bold, ...message);
}