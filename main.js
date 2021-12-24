const getItemsFromLocalStorage = () => {
  if (localStorage.getItem('name') !== null)
    $('#name').val(localStorage.getItem('name'));
  if (localStorage.getItem('email') !== null)
    $('#email').val(localStorage.getItem('email'));
  if (localStorage.getItem('message') !== null)
    $('#msg').val(localStorage.getItem('message'));
  if (localStorage.getItem('checkbox') !== null) {
    $('#checkbox').prop('checked', localStorage.getItem('checkbox') === 'true');
    if ($('#checkbox').prop('checked')) $('#sendToBtn').removeAttr('disabled');
  }
};

const setItemsToLocalStorage = () => {
  localStorage.setItem('name', $('#name').val());
  localStorage.setItem('email', $('#email').val());
  localStorage.setItem('message', $('#msg').val());
  localStorage.setItem('checkbox', $('#checkbox').prop('checked'));
};

const clearLocalStorage = () => {
  localStorage.clear();
  $('#name').val('');
  $('#email').val('');
  $('#msg').val('');
  $('#checkbox').prop('checked', false);
};

$(document).ready(function () {
  getItemsFromLocalStorage();

  $('.btnToOpen').click(() => {
    $('.hiddenDiv').css('display', 'flex');
    history.pushState(true, '', './form');
    $('.main').css({ transition: '4s', background: '#3c1053' });
    clearLocalStorage();
  });
  $('.btnToClose').click(function () {
    $('.hiddenDiv').css('display', 'none');
    history.pushState(false, '', '.');
    $('.main').css({ transition: '4s', background: '#5a1580' });
    clearLocalStorage();
    $('#btnToSend').attr('disabled', '');
  });
  $('#form').submit(function (e) {
    e.preventDefault();
    $('.hiddenDiv').css('display', 'none');
    $('#btnToSend').attr('disabled', '');
    let data = $(this).serialize();
    let name;
    if ($('#name').val() !== '') name = $('#name').val();
    else name = 'user';
    let email;
    if ($('#email').val() !== '') email = $('#email').val();
    else email = 'none';
    let msg;
    if ($('#msg').val() !== '') msg = $('#msg').val();
    else msg = 'none';
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: 'https://formcarry.com/s/cMhrJQ7tuB',
      data: data,
      success: function (error) {
        setTimeout(() => {
          $('.hiddenResponse').css('display', 'flex');
        }, 1500);
        if (error.status === 'success') {
          $('.answer').text('Thanks to visit, ' + name);
          $('.emailP').text('Email: ' + email);
          $('.message').text('Message: ' + msg);
        } else alert('Error: ' + error.status);
      },
    });
  });
  $('.close').click(function () {
    console.log('Loading......')
    $('.hiddenResponse').css('display', 'none');
    history.pushState(false, '', '.');
    $('.main').css({ transition: '4s', background: '#5a1580' });
  });
  $('#checkbox').change(function () {
    if (this.checked) $('#btnToSend').removeAttr('disabled');
    else $('#btnToSend').attr('disabled', '');
  });
  $('#form').change(setItemsToLocalStorage);

  window.onpopstate = function (e) {
    if (e.state) $('.hiddenDiv').css('display', 'flex');
    else {
      $('.hiddenDiv').css('display', 'none');
    }
  };
});
