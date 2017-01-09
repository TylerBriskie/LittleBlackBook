$(()=>{
console.log('YES')
$('.zipbutton').click((event)=>{
  event.preventDefault();
  console.log('clicked');

});

if($('.suitor_select').length > 0) {
  let id = $('.suitor_select').val();
  $.get(`https://littleblackbook-g-38.herokuapp.com/plan_date/get_contact/${id}`)
  .done((suitor)=> {
    $('.contact_container').empty();
    $('.contact_container').hide();
    $('.contact_container').append(`<img class='contact' src='${suitor.image_url}'/>`);
    $('.contact_container').append(`<span class="stars center">${suitor.rating}</span>`);
    $('.contact_container').append(`<p class='contact-name'><span class='name'><b>${suitor.name}</b></span></p>`);
    $('.contact_container').append(`<p class='contact-met'><b>Where Met?</b> ${suitor.where_met}</p>`);
    $('.contact_container').append(`<p class='contact-note'><b>Note: </b> ${suitor.note}</p>`);
    $('.contact_container').fadeIn("slow");
    console.log(suitor);

    $.fn.stars = function() {
    return $(this).each(function() {
        var val = parseFloat($(this).html());
        halfVal = (val/2);
        var size = Math.max(0, (Math.min(5, halfVal))) * 15;
        var $span = $('<span />').width(size);
        $(this).html($span);
    });
    };
    $(function() {
      $('span.stars').stars();
    });



  })

}

$('.suitor_select').change(()=> {
  let id = $('.suitor_select').val();
  $.get(`https://littleblackbook-g-38.herokuapp.com/plan_date/get_contact/${id}`)
  .done((suitor)=> {
    $('.contact_container').empty();
    $('.contact_container').hide();
    $('.contact_container').append(`<img class='contact' src='${suitor.image_url}'/>`);
    $('.contact_container').append(`<span class="stars center">${suitor.rating}</span>`);
    $('.contact_container').append(`<p class='contact-name'><span class='name'><b>${suitor.name}</b></span></p>`);
    $('.contact_container').append(`<p class='contact-met'><b>Where Met?</b> ${suitor.where_met}</p>`);
    $('.contact_container').append(`<p class='contact-note'><b>Note: </b> ${suitor.note}</p>`);
    $('.contact_container').fadeIn("slow");
    console.log(suitor);

    $.fn.stars = function() {
    return $(this).each(function() {
        var val = parseFloat($(this).html());
        halfVal = (val/2);
        var size = Math.max(0, (Math.min(5, halfVal))) * 15;
        var $span = $('<span />').width(size);
        $(this).html($span);
    });
    };
    $(function() {
      $('span.stars').stars();
    });



      })
    }
    );

    // if($('.before-dates').length > 0){
    //   if ($('.before-dates').children().length === 0){
    //     $('.completed').css('display','none');
    //     // $('.upcoming').css('display',)
    //   }
    // }
    // console.log($('.before-dates').children().length);


})
