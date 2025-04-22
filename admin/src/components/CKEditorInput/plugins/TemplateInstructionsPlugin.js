import './TemplateInstructions.css';

export class TemplateInstructionsPlugin {
	static get pluginName() {
		return 'TemplateInstructions';
	}

	constructor(editor) {
		this.editor = editor;
	}

	init() {
		// Get instructions from config
		const instructions = this.editor.config.get('templateInstructions') || '';
		if (!instructions) return;

		const formatInstructions = text => {
			// Highlight variable patterns
			return text.replace(/\{\{([^}]+)\}\}/g, '<code>{{$1}}</code>');
		};

		// Create the instructions element after the editor is ready
		this.editor.ui.on('ready', () => {
			// Find the main editor element
			const editorElement = this.editor.ui.view.editable.element;
			const editorContainer = editorElement.parentElement.parentElement;

			// Create instruction element
			const instructionsElement = document.createElement('div');
			instructionsElement.className = 'ck-template-instructions';
			instructionsElement.innerHTML = formatInstructions(instructions);
			instructionsElement.style.padding = '10px';
			instructionsElement.style.backgroundColor = '#f3f5f9';
			instructionsElement.style.color = '#666';
			instructionsElement.style.borderBottom = '1px solid #ddd';
			instructionsElement.style.fontSize = '13px';
			instructionsElement.style.marginBottom = '10px';

			// Insert before the editor
			editorContainer.insertBefore(
				instructionsElement,
				editorContainer.firstChild
			);
		});
	}
}
