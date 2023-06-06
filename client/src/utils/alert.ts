import Swal from 'sweetalert2';

export const timerAlert = (remainingTime: number) => {
  if (remainingTime > 120) {
    let timerInterval: NodeJS.Timeout | undefined;
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '잠시만 기다려주세요!',
      html: '<span id="seconds"></span>초 뒤에 재요청 가능합니다.',
      timer: (remainingTime - 120) * 1000,
      timerProgressBar: true,
      showCloseButton: true,
      didOpen: () => {
        Swal.showLoading();
        const seconds = Swal.getHtmlContainer()?.querySelector('#seconds');
        timerInterval = setInterval(() => {
          const timerLeft = (Swal.getTimerLeft()! / 1000).toFixed(0);
          if (seconds) {
            seconds.textContent = timerLeft;
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
    return false;
  }
  return true;
};

export const notYetVerifiedAlert = () => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: '휴대폰 번호 인증을 해주세요!',
  });
};

export const notYetAgreedAlert = () => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: '필수 동의 여부를 확인해주세요!',
  });
};

export const alreadyVerifiedAlert = () => {
  Swal.fire({
    position: 'center',
    icon: 'info',
    text: '이미 휴대폰 번호 인증이 완료되었습니다.',
  });
};

export const alreadyExpiredAlert = () => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    text: '인증 시간이 만료되었습니다. 인증번호를 다시 요청주세요.',
  });
};
