//
//  ConcentrationThemeChooserViewController.swift
//  concentration
//
//  Created by Shayantani Kar on 16/12/25.
//

import UIKit

class ConcentrationThemeChooserViewController: UIViewController {

    let themes = [
        "Sports": "⚽️🏐🎾🎱🏉🎳🏓🏏🏑",
        "Winter": "❄️⛄🌨️🥶🧊🏔️🎿🧣🧤",
        "Halloween" : "👻🎃🦇🪔🕷🎶😈👹🕶️"
    ]

        
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if (segue.identifier == "Choose Theme") {
            if let themeName = (sender as? UIButton)?.titleLabel?.text, let theme = themes[themeName] {
                if let cvc = segue.destination as? ConcentrationViewController {
                    cvc.theme = theme
                }
            }
        }
    }
}
