import { App, PluginSettingTab, Setting } from 'obsidian'
import Plugin from './main'

export interface Settings {
  mode: string
}

export const DEFAULT_SETTINGS: Settings = {
  mode: 'default'
}

export class SettingTab extends PluginSettingTab {
  plugin: Plugin

  constructor(app: App, plugin: Plugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this

    containerEl.empty()

    new Setting(containerEl)
      .setName('Settings #1')
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder('Enter your secret')
          .setValue(this.plugin.settings.mode)
          .onChange(async (value) => {
            this.plugin.settings.mode = value
            await this.plugin.saveSettings()
          })
      )
  }
}
