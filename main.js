console.log('I Hate Facebook starting to remove content');
var rightColEl = document.getElementById('rightCol');
var mainContentEl = document.getElementById('contentCol');

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

function cleanContentCol(){
    // Remove friend suggestions
    var suggestEls = document.querySelectorAll('span.fwb.fcb');
    for(var i=0; i < suggestEls.length; i++)
    {
        //console.log(suggestEls[i].innerText);
        if ('People You May Know' == suggestEls[i].innerText) {
            console.log('Removing people you may know');
            var node = suggestEls[i];
            while (!node.id || !node.id.startsWith('substream')) {
                node = node.parentNode;
            }
            node.parentNode.removeChild(node);
        }
    }

    // Remove suggested posts
    suggestEls = document.querySelectorAll('.userContentWrapper span');
    for(var i=0; i < suggestEls.length; i++)
    {
        var text = suggestEls[i].innerText;
        if ('Suggested Post' ==  text) {
            console.log('Removing ' + text);
            var node = suggestEls[i];
            while (!node.id || !node.id.startsWith('substream')) {
                node = node.parentNode;
            }
            node.parentNode.removeChild(node);
        }
    }

    // Remove all friend recommendations
    suggestEls = document.querySelectorAll('.userContentWrapper div');
    for(var i=0; i < suggestEls.length; i++)
    {
        var text = suggestEls[i].innerText;
        if ('See all friend recommendations' == text) {
            console.log('Removing ' + text);
            var node = suggestEls[i];
            while (!node.id || !node.id.startsWith('substream')) {
                node = node.parentNode;
            }
            node.parentNode.removeChild(node);
        }
    }

    // Remove sponsored links
    var sponsoredLinkEl = document.querySelectorAll('a.uiStreamSponsoredLink');
    for(var i=0; i < sponsoredLinkEl.length; i++)
    {
        var text = sponsoredLinkEl[i].innerText;
        if ('Sponsored' ==  text) {
            console.log('Removing ' + text);
            var node = sponsoredLinkEl[i];
            while (!node.id || !node.id.startsWith('substream')) {
                node = node.parentNode;
            }
            node.parentNode.removeChild(node);
        }
    }
}

// Remove the right column
console.log('Removing right column');
rightColEl.parentNode.removeChild(rightColEl);
if (mainContentEl.classList) {
    mainContentEl.classList.remove('hasRightCol');
} else {
    mainContentEl.className = mainContentEl.className.replace(new RegExp('(^|\\b)' + 'hasRightCol'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

// Observe a specific DOM element:
observeDOM( mainContentEl , cleanContentCol);
cleanContentCol();
