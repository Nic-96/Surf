const findBLock = (alias) => {
    return $(".reviews__item").filter((ndx, item) =>{
        return $(item).attr("data-linked-with") == alias;
    })
}
$('.interactive-avatar__link').on('click', function(e) {
    e.preventDefault();
    
    const target =$(this).attr("data-open");
    const itemToShow = findBLock(target);
    const currentItem = $(this).closest('.interactive-avatar');
    
    itemToShow.addClass('active').siblings().removeClass('active');
    currentItem.addClass('active').siblings().removeClass('active');
})

