
const bgElement = document.getElementById("bg-img"); 
const bodyElement = document.getElementById("body"); 

const infoBlockBlogElement = document.getElementById("info-block-blog"); 
const infoBlockInformationElement = document.getElementById("info-block-information"); 
const infoBlockMyMediaElement = document.getElementById("info-block-my-media"); 
const infoBlockStudentsMediaElement = document.getElementById("info-block-students-media"); 
const infoBlockReviewsElement = document.getElementById("info-block-reviews"); 

const contentContainerElement = document.getElementById("content-container"); 
const cloudElements = document.getElementsByClassName("cloud");

const BG_HEIGHT = 3043
const BG_WIDTH = 4454
const BG_ASPECT_RATIO = BG_WIDTH / BG_HEIGHT;

const alignContentContainer = () => {
    const clientWidth = bgElement.clientWidth;
    const clientHeight = bgElement.clientHeight;
    const clientAspectRatio = clientWidth / clientHeight;

    let scale = 1;

    if (clientAspectRatio < BG_ASPECT_RATIO) {
        scale = BG_HEIGHT / clientHeight
    } else {
        scale = BG_WIDTH / clientWidth
    }
    
    const clientFullHeight = (1 / scale) * BG_HEIGHT
    const clientFullWidth = (1 / scale) * BG_WIDTH
    
    const clientTop = (clientFullHeight - clientHeight) / 2;
    const clientLeft = (clientFullWidth - clientWidth) / 2;

    contentContainerElement.style.height = clientFullHeight + 'px';
    contentContainerElement.style.width = clientFullWidth + 'px';

    contentContainerElement.style.top = - clientTop + 'px';
    contentContainerElement.style.left = - clientLeft + 'px';
}

window.addEventListener('resize', alignContentContainer)

const forEachCloud = (cb) => {
    for (let i = 0; i < cloudElements.length; i++) {
        cb(cloudElements.item(i))
    }
}

const fade = () => {
    if (infoBlockInformationElement.classList.contains('selected')) {
        infoBlockInformationElement.classList.add('closed')

        setTimeout(() => {
            infoBlockInformationElement.classList.remove('selected')
            infoBlockInformationElement.classList.remove('closed')
        }, 0);
    }

    if (infoBlockStudentsMediaElement.classList.contains('selected')) {
        infoBlockStudentsMediaElement.classList.add('closed')

        setTimeout(() => {
            infoBlockStudentsMediaElement.classList.remove('selected')
            infoBlockStudentsMediaElement.classList.remove('closed')
        }, 0);
    }

    if (infoBlockMyMediaElement.classList.contains('selected')) {
        infoBlockMyMediaElement.classList.add('closed')

        setTimeout(() => {
            infoBlockMyMediaElement.classList.remove('selected')
            infoBlockMyMediaElement.classList.remove('closed')
        }, 0);
    }

    if (infoBlockReviewsElement.classList.contains('selected')) {
        infoBlockReviewsElement.classList.add('closed')

        setTimeout(() => {
            infoBlockReviewsElement.classList.remove('selected')
            infoBlockReviewsElement.classList.remove('closed')
        }, 0);
    }

    if (infoBlockBlogElement.classList.contains('selected')) {
        infoBlockBlogElement.classList.add('closed')

        setTimeout(() => {
            infoBlockBlogElement.classList.remove('selected')
            infoBlockBlogElement.classList.remove('closed')
        }, 0);
    }
}


forEachCloud((cloud) => {
    cloud.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!(infoBlockBlogElement.classList.contains('closed')
            || infoBlockInformationElement.classList.contains('closed')
            || infoBlockMyMediaElement.classList.contains('closed')
            || infoBlockStudentsMediaElement.classList.contains('closed')
            || infoBlockReviewsElement.classList.contains('closed')
        ) & 
            !(infoBlockBlogElement.classList.contains('selected')
            || infoBlockInformationElement.classList.contains('selected')
            || infoBlockMyMediaElement.classList.contains('selected')
            || infoBlockStudentsMediaElement.classList.contains('selected')
            || infoBlockReviewsElement.classList.contains('selected')
        )) {
            forEachCloud(c => {
                c.classList.remove('selected'); 
                c.style.top = ''
            })
            cloud.classList.add('selected'); 
         
            contentContainerElement.classList.add('selected'); 

            if (cloud.id === 'information-cloud') {
                infoBlockInformationElement.classList.add('selected')
            } else if (cloud.id === 'students-media-cloud') {
                infoBlockStudentsMediaElement.classList.add('selected')
            } else if (cloud.id === 'my-media-cloud') {
                infoBlockMyMediaElement.classList.add('selected')
            } else if (cloud.id === 'reviews-cloud') {
                infoBlockReviewsElement.classList.add('selected')
            } else if (cloud.id === 'blog-cloud') {
                infoBlockBlogElement.classList.add('selected')
            }
    
            cloud.style.top = `calc(5% - ${contentContainerElement.style.top.split('px')[0] * 0.8}px)`
        }

    })
})

contentContainerElement.addEventListener('click', (e) => {
    forEachCloud(c => {
        c.classList.remove('selected'); 

        c.style.top = ''
    })

    fade();

    contentContainerElement.classList.remove('selected')
})

alignContentContainer()

setInterval(() => {
    alignContentContainer()
}, 1000);

window.onload = () => {
    bodyElement.style.display = 'block';
    alignContentContainer()
};