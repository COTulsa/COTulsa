//Character count widget - display character count for a text area
(function($) { // Hide scope, no $ conflict
	'use strict';

	var definition = {
		options: {
			msg_remaining: 'remaining characters.',
			msg_maxreached: 'You have reached the maximum number of characters.',
			msg_class: 'charcountmsg',
			max_char: -1,
			msg_element: ''
		},
		_create: function() {
			this.element.addClass(this.widgetFullName || this.widgetBaseClass);
			var opts = this.options;
			var parent = $(this.element).attr('id').replace('dform_widget_','');
			var outputid = parent + '_charcount_msg';
			console.log("parent:", parent);
			
			if(opts.msg_element !== ''){
			    $(opts.msg_element).append('<div id="' + outputid + '" class="' + opts.msg_class + '"></div>');
			} 
			else {
			    $(this.element).parent().append('<div id="' + outputid + '" class="' + opts.msg_class + '"></div>');
			}
			
			console.log
			if (opts.max_char == -1){
			    this.options.max_char = $(this.element).attr('maxlength');
			    if (Number.isNaN(this.options.max_char) || typeof this.options.max_char === "undefined") { 
			        this.options.max_char = 10;
			        console.log("WARNING: max_char defaulting to 10.  Ensure you configure max length attribute for text area or provide a max_char value")
			    }
			}
			
			let msg = '';
            var currentLength = $(this.element).val().length;
            var remainingchars = opts.max_char - currentLength;

            if( currentLength >= opts.max_char ){
                msg = opts.msg_maxreached;    
            }else{
                msg = remainingchars + ' ' + opts.msg_remaining;
            }
			$('#' + outputid).html(msg);
			
		    $(this.element).on('input', function(){
    			let msg = '';
                var currentLength = $(this).val().length;
                var remainingchars = opts.max_char - currentLength;
    
                if( currentLength >= opts.max_char ){
                    msg = opts.msg_maxreached;    
                }else{
                    msg = remainingchars + ' ' + opts.msg_remaining;
                }
    			$('#' + outputid).html(msg);
            });
		},
		_destroy: function() {
			this.element.removeClass(this.widgetFullName || this.widgetBaseClass);
		}
	};

	if (!$.Widget.prototype._destroy) {
		$.extend(definition, {
			destroy: function() {
				this._destroy();
				$.Widget.prototype.destroy.call(this); 
			}
		});
	}

    if ($.Widget.prototype._getCreateOptions === $.noop) {
		$.extend(definition, {
			_getCreateOptions: function() {
				return $.metadata && $.metadata.get(this.element[0])[this.widgetName];
			}
		});
	}

	$.widget('cmpro.charcount', definition);
})(jQuery);
