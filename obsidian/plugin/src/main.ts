import {
  App,
  Editor,
  MarkdownView,
  Modal as _Modal,
  Notice,
  Plugin as _Plugin
} from 'obsidian'
import { DEFAULT_SETTINGS, Settings, SettingTab } from './settings'

export default class Plugin extends _Plugin {
  settings: Settings

  async onload() {
    await this.loadSettings()

    this.addRibbonIcon('dice', 'Sample', (evt: MouseEvent) => {
      new Notice('This is a notice!')
    })

    const statusBarItemEl = this.addStatusBarItem()
    statusBarItemEl.setText('Status bar text')

    this.addCommand({
      id: 'open-modal-simple',
      name: 'Open modal (simple)',
      callback: () => {
        new Modal(this.app).open()
      }
    })

    this.addCommand({
      id: 'replace-selected',
      name: 'Replace selected content',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        editor.replaceSelection('Sample editor command')
      }
    })

    this.addCommand({
      id: 'open-modal-complex',
      name: 'Open modal (complex)',
      checkCallback: (checking: boolean) => {
        const markdownView =
          this.app.workspace.getActiveViewOfType(MarkdownView)
        if (markdownView) {
          if (!checking) {
            new Modal(this.app).open()
          }
          return true
        }
        return false
      }
    })

    this.addSettingTab(new SettingTab(this.app, this))

    this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
      new Notice('Click')
    })

    this.registerInterval(
      window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000)
    )
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      (await this.loadData()) as Partial<Settings>
    )
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}

class Modal extends _Modal {
  constructor(app: App) {
    super(app)
  }

  onOpen() {
    let { contentEl } = this
    contentEl.setText('Woah!')
  }

  onClose() {
    const { contentEl } = this
    contentEl.empty()
  }
}
