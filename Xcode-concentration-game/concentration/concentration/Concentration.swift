//
//  Concentration.swift
//  concentration
//
//  Created by Shayantani Kar on 08/12/25.
//

import Foundation

struct Concentration {
    private(set) var cards = [Card]()
    
    private var indexOfOneAndOnlyFaceUpCard: Int? {
        get{
            return cards.indices.filter{cards[$0].isFaceUp}.oneAndOnly
        }
        set {
            for index in cards.indices {
                cards[index].isFaceUp = (index == newValue)
            }
        }
    }
    
    mutating func chooseCard(at index: Int){
        assert(cards.indices.contains(index), "Concentration.chooseCard(at: \(index)): chosen index not in cards")
        
        if !cards[index].isMatched{
            if let matchIndex = indexOfOneAndOnlyFaceUpCard, matchIndex != index {
                if cards[matchIndex] == cards[index] {
                    cards[matchIndex].isMatched = true
                    cards[index].isMatched = true
                }
                cards[index].isFaceUp = true
            } else {
                indexOfOneAndOnlyFaceUpCard = index
            }
        }
    }
    
    
    init(numberOfPairOfCards: Int){
        assert(numberOfPairOfCards > 0, "Concentration.init: must init with more than 0 pairs of cards")
        for _ in 0..<numberOfPairOfCards{
            let card = Card()
            cards += [card, card]
        }
    }
}

extension Collection{
    var oneAndOnly: Element? {
        return count == 1 ? first : nil
    }
}
