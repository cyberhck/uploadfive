function file_selected()
{
	var file =document.getElementById('randomizethisidsothatitisnotmatching').files[0];
	filename=file.name;
	filesize=file_size_text(file.size);
	filetype=file.type;
	$('.uploadfive .filename').html(filename);
	$('.uploadfive .filesize').html(filesize);
	$('.uploadfive .filetype').html(filetype);
	$('.uploadfive .uploaded').html('0');
	$('.uploadfive .remaining').html(filesize);
	$('.uploadfive .progressbar').progressbar({value:0});
	$('.uploadfive .browse').hide();
	$('.uploadfive .cancel').show();
	$('.uploadfive .show_or_hide_details').show();
	$('.uploadfive .upload').show();
}
window.def=0;
window.abc=0;
function calc(){
prev=window.def
now=window.abc
uploaded=now-prev;
speed=((uploaded))*2;
speed=file_size_text(speed)+"/S";
$("#speedDisplay").html(speed);
window.def=now;
}

function file_size_text(size)
{
	if(size==0)
	{
		returntext='0 KB';
	}else if(size>1073741824)
	{
		returntext=Math.round((size/1073741824)*100)/100+' GB';
	}else if(size>1048576)
	{
		returntext=Math.round((size/1048576)*100)/100+' MB';
	}else
	{
		returntext=Math.round(size/1024*100)/100+' KB';
	}
	return returntext;	
}
function upload()
{
	action=$('.uploadfive').attr('action');
	var http=new XMLHttpRequest();
	fd=new FormData()
	fd.append("upload_five_file", document.getElementById('randomizethisidsothatitisnotmatching').files[0]);
	http.upload.addEventListener("progress", uploadProgress, false);
	http.addEventListener("load", uploadComplete, false);
	http.addEventListener("error", uploadFailed, false);
	http.addEventListener("abort", uploadCanceled, false);
	http.open("POST",action,true);
	http.send(fd);
	window.abc=0;
	window.speed=setInterval(calc,500);
}
function uploadProgress(e)
{
	window.abc=e.loaded;
	percentage=e.loaded*100/e.total;
	$('.uploadfive .percentage').html(Math.round(percentage*1000)/1000+" %");
	$('.uploadfive .progressbar').progressbar({value:(percentage)});
	remaining=file_size_text(e.total-e.loaded);
	$('.uploadfive .percentage').html(Math.round(percentage*100)/100+' %');
	uploaded=file_size_text(e.loaded);
	$('.uploadfive .remaining').html(remaining);
	$('.uploadfive .uploaded').html(uploaded);
}
function uploadComplete(e)
{
	
	$('#uploadfive_dialog').html(e.target.responseText);
	$('.uploadfive .progressbar').progressbar({value:0});
	$('.uploadfive .titlebar .filename').html("Click Browse to browse for more files");
	$('.uploadfive .percentage').html("0 %");
	$('.uploadfive .cancel').hide();
	$('.uploadfive .browse').show();
	$('#uploadfive_dialog').dialog({title:'Message From Server',modal:true,width:800,buttons: {
				Ok: function() {
					$(this).dialog("close");
				}
			}});
	clearInterval(window.speed);
}
function uploadFailed(e)
{
}
function uploadCanceled(e)
{
}
jQuery.fn.uploadfive=function(){
	$(this).addClass('uploadfive');
	a='<div class="titlebar"><span class="filename">Click Browse Button to browse for files</span><span class="percentage">0%</span></div><div class="progressbar"></div><span class="show_or_hide_details">Show/Hide Details</span><div class="details" style="display:none;">File Name: <span class="filename"></span><br />File Size: <span class="filesize"></span><br />File Type: <span class="filetype"></span><br />Uploaded: <span class="uploaded"></span><br />Remaining: <span class="remaining"></span><br />Speed:<span id="speedDisplay"></span><br /></div><input type="file" id="randomizethisidsothatitisnotmatching" name="file_selected" onChange="file_selected();" class="file" /><div class="button_container"><span><input type="button" value="Browse" class="browse" /><input type="button" value="cancel" class="cancel" /></span><span class="upload_button"><input type="button" value="upload" class="upload" /></span></div><div style="display:none;"id="uploadfive_dialog"></div>';
	$(this).html(a);
	$('.uploadfive .progressbar').progressbar({value:0});
	$('.uploadfive .browse').bind('click',function(){
		$('.uploadfive .file').click();
		});
	$('.uploadfive .browse').show();
	$('.uploadfive .show_or_hide_details').click(function(e) {
        $('.uploadfive .details').toggle('slow');
    });
	$('.uploadfive .cancel').click(function(e) {
		if(confirm('File Upload will be canceled'))
		{
			$('.uploadfive .titlebar').html('Click Browse Button to browse for files')
    		$('.uploadfive .filename').html('File Not selected')
    		$('.uploadfive .filesize').html('N/A')
			$('.uploadfive .file').val('');
			$('.uploadfive .filetype').html('N/A');
			$('.uploadfive .remaining').html('N/A');
			$('.uploadfive .uploaded').html('N/A');
			$(this).hide();
			$('.uploadfive .browse').show();
			$('.uploadfive .progressbar').progressbar({value:0});
		}});
	$('.uploadfive .upload').click(function(e){
        upload();
    });
}
