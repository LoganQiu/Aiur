document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('pre.abc').forEach(function(block) {
        const notation = block.textContent;
        const div = document.createElement('div');
        div.className = 'abc-notation';
        block.parentNode.insertBefore(div, block);
        block.style.display = 'none';
        ABCJS.renderAbc(div, notation, {
            responsive: 'resize'
        });
    });
});