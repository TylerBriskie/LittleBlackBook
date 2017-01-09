$(document).ready(function() {
    $('.carousel').carousel({shift:100});

    // vvv STAR RATING vvv

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

    // HIDDEN FORM FOR ADDING NEW SUITOR //

    $('.hidden_form').append(
            `
      <h4>Add New Contact</h4>
      <div class="row">
      <div class="input-field col s6">
        <input id="name" type="text" class="validate" placeholder="Name" name="name">
      </div>
      <div class="input-field col s6">
        <input id="age" type="text" class="validate" placeholder="Age" name="age">
      </div>
      </div>
      <div class="row">
      <div class="input-field col s6">
        <input id="where met" type="text" class="validate" placeholder="Where you met?" name="where_met">
      </div>
      <div class="input-field col s6">
        <input id="rating" type="text" class="validate" placeholder="Rating (1-10)" name="rating">
      </div>
      </div>
      <div class="input-field col s6">
        <input id="image URL" type="text" class="validate" placeholder="paste image URL here" name="image_url">
      </div>
      <div class="input-field col s6">
        <input id="image URL" type="text" class="validate" placeholder="Notes about your contact..." name="notes">
      </div>
      <div class="crud-buttons">
        <button class="btn green waves-effect waves-light" id="add-suitor" type="submit">Submit</button>
      </div>
      `
        );

    $('#add_suitor').on('click',(function(){
      // $("html, body").animate({
            // scrollTop: $(document).height()
        // }, "slow");
        $('.hidden_form').fadeIn(1600);
    }));
});
