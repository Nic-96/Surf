const openItem = item => {
    const container = item.closest('.member');
    const contentBlock = container.find('.member__content');
    const textBlock = contentBlock.find('.member__content-block');
    const reqHeight = textBlock.height();

    container.addClass('active')
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find('.member__content');
    const itemContainer = container.find('.member')

    itemContainer.removeClass('active');
    items.height(0);
}

$('.member__title').on('click', function (e) {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team__list');
    const elemContainer = $this.closest('.member');

    if (elemContainer.hasClass('active')) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }
    
    
})