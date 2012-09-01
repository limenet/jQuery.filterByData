(function( $ ){
	$.fn.filterMultipleData = function(termSelector = 'button', items = '.filter-items > li', filterAttribute = 'term-id') {
		var $terms = this;
		var $termsSelectors = this.find(termSelector);
		var $items = $(items);
		$termsSelectors.each(function() {
			$(this).data('filter-active', 'no')
		});
		$termsSelectors.on('click', function(event) {
			event.preventDefault();			
			var activeFilters = [];
			var $clickedTerm = $(this);
			if($clickedTerm.data(filterAttribute) == 'all'){
				$termsSelectors.each(function() {
					$(this).data('filter-active', 'no')
				});
			}else{
				$termsSelectors.filter($('[data-' + filterAttribute + '="all"]')).data('filter-active', 'no');
			}
			if($clickedTerm.data('filter-active') == 'yes'){
				$clickedTerm.data('filter-active', 'no');
			}else{
				$clickedTerm.data('filter-active', 'yes');
			}	
			$termsSelectors.each(function(){
				var $cSelector = $(this);
				if($cSelector.data('filter-active') == 'no'){
					$cSelector.removeClass('active');
				}else if($cSelector.data('filter-active') == 'yes'){
					$cSelector.addClass('active');
					activeFilters.push($cSelector.data(filterAttribute));
				}
			});
			if(activeFilters.length === 0){
				$termsSelectors.filter($('[data-' + filterAttribute + '="all"]')).data('filter-active', 'yes').addClass('active');
			}
			var showString = '';
			for (var i = activeFilters.length - 1; i >= 0; i--) {
				showString += '[data-' + filterAttribute + '~="' + activeFilters[i] + '"]';
			};
			$('#filterNoResultAlert').remove();
			if(activeFilters.length > 0 && $clickedTerm.data(filterAttribute) != 'all'){
				$items.filter($(':not(' + showString + ')')).fadeOut();
				$items.filter($(showString)).fadeIn().delay(400);
			}else{
				$items.fadeIn();
			}
			var xxx = $items.find(':visible').size();
			setTimeout(function() {
				if($items.find(':visible').size() === 0){
					$items.parent().append('<div class="alert alert-info" id="filterNoResultAlert"><button type="button" class="close" data-dismiss="alert">×</button>Leider haben wir keine Marken im Angebot, die all Ihren Suchkriterien entsprechen.</div>');
				}
			}, 400);			
		});
		return true;
	}
})( jQuery );