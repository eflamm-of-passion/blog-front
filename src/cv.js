import CustomElement from './custom-element.js';
import { cvStyle, mainThemeStyle } from './style';

const template = document.createElement('template');
template.innerHTML = `
	<article>
		<h1>Hello World</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae scelerisque ante. Quisque at sapien turpis. Quisque vestibulum lacus ac orci commodo, sit amet dapibus libero lacinia. In hendrerit ipsum ultricies urna semper commodo. Phasellus a elementum mi. Etiam egestas venenatis odio, eu imperdiet ante. Aenean vel diam turpis.</p>
		<p>Nam luctus efficitur tortor ac pretium. Maecenas ut elementum ligula, pretium sodales augue. Phasellus ut eros vitae nibh sollicitudin sollicitudin. Ut eu pellentesque tortor, vitae maximus est. Nulla tincidunt ut justo id commodo. Pellentesque vitae vestibulum lorem. Praesent mattis tellus vitae ullamcorper blandit. Fusce elementum ornare magna, a scelerisque lorem convallis fermentum. Mauris feugiat arcu quis lorem tempor sagittis. Pellentesque ut arcu ut ipsum cursus lobortis sed ut turpis. Aenean neque neque, ultrices sed sollicitudin quis, venenatis quis elit. Pellentesque suscipit purus a venenatis tincidunt.</p>
		<p>Nullam vulputate ultrices mauris ut molestie. Vivamus at dui id libero dictum fermentum. Mauris ac odio at quam fermentum tempor. Integer eu convallis sem, vel pulvinar ante. Maecenas nec velit sapien. Sed gravida facilisis augue, sed auctor eros egestas accumsan. Proin auctor volutpat turpis at egestas. </p>
	</article>
`;

export default class Curriculum extends CustomElement {
	constructor(state) {
		super(template, [cvStyle, mainThemeStyle], state);
	}
}