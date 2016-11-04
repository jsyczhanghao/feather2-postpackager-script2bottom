'use strict';

var REG = /<script [^>]*\bscript2bottom[^>]*>[\s\S]*?<\/script>/g;

module.exports = function(ret){
    feather.util.map(ret.src, function(subpath, file){
        if(file.isHtmlLike){
            var content = file.getContent(), stack = [];

            content = content.replace(REG, function(all){
                stack.push(all);
                return '';
            });

            if(!file.isPageletLike && content.indexOf('</body>') > -1){
                content = content.replace(/<\/body>/i, function(){
                    return stack.join('') + '</body>';
                });
            }else{
                content += stack.join('');
            }

            file.setContent(content);

        }
    });
};