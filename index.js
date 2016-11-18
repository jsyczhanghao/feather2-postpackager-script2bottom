'use strict';

var REG = /<script( [^>]*?\b(?:script2)?bottom[^>]*)>([\s\S]*?)<\/script>/g;

module.exports = function(ret){
    feather.util.map(ret.src, function(subpath, file){
        if(file.isHtmlLike){
            var content = file.getContent(), stack = [];

            content = content.replace(REG, function(all, _1, _2){
                all = '<script' + _1.replace(/\s*(?:script2)?bottom\s*/, ' ').replace(/\s*$/, '') + '>' + _2 + '</script>';
                stack.push(all);
                return '';
            });

            if(!file.isPageletLike && /<!--(?:FEATHER )?STATIC POSITION:BOTTOM-->|<\/body>/i.test(content)){
                content = content.replace(/<!--(?:FEATHER )?STATIC POSITION:BOTTOM-->|(<\/body>)/i, function(all, tag){
                    return stack.join('') + (tag || '');
                });
            }else{
                content += stack.join('');
            }

            file.setContent(content);

        }
    });
};