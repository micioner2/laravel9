<template>
    <div>
		<router-view />
	</div>
</template>
<script>
import {useTitle} from './app/stores/title';
import { mapActions } from 'pinia';
export default {
	methods:{
  		...mapActions(useTitle,['setTitlePage'])
	},
	watch: {
		$route(to, from) {
			if (to.path !== from.path) {
				window.scrollTo(0, 0);
				this.setTitlePage(to.meta.title);
			}
		}
	}
}
</script>