$('.js-fullheight').css('height', $(window).height());

$(window).resize(function(){
	$('.js-fullheight').css('height', $(window).height());
});

$('#sidebarCollapse').on('click', function () {
$('#sidebar').toggleClass('active');

});
