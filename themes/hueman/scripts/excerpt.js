/**
* Excerpt Helper
* @description Get the excerpt from a post
* @example
*     <%- excerpt(post) %>
*/
hexo.extend.helper.register('excerpt', function (post) {
    var excerpt;
    if (post.excerpt) {
        excerpt = post.excerpt.replace(/\<[^\>]+\>/g, '');
    } else {
        excerpt = post.content.replace(/\<[^\>]+\>/g, '').substring(0, 200);
    }
    return excerpt;
});

function thumbnail(post) {
    var url = post.thumbnail || '';
    if (!url) {
        var imgPattern = /\<img\s.*?\s?src\s*=\s*['|"]?([^\s'"]+).*?\>/ig;
        var result = imgPattern.exec(post.content);
        if (result && result.length > 1) {
            url = result[1];
        }
    }
    return url;
}

hexo.extend.helper.register('htmlGenerator', function(args){
    if(!args || !args.json || args.json.length == 0)return "";
    
    var returnHTML = "";
    
    function generateHTML(list){
      
      var ret = "";
      ret += "<li class=\"" + args.class + "-item\">";
      
      //console.log(list)
      //console.log(thumbnail(list))
      
      ret += '<div class="'+args.class+'-title"><p><a href="' + list.path + '" title="'+ list.title +'" rel="bookmark">'+ list.title + "</a></p></div>";
      
      ret +=  "</li>";
      return ret;
    }
    
    for(var i=0; i<args.json.length; i++){
        returnHTML += generateHTML(args.json[i]);
    }
    
    if(returnHTML != "")returnHTML = "<ul class=\"" + args.class + "\">" + returnHTML + "</ul>";
    
    return returnHTML;
  });