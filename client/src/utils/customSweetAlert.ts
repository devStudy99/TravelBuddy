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
