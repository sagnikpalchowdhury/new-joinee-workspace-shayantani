//
//  Card.swift
//  concentration
//
//  Created by Shayantani Kar on 08/12/25.
//

import Foundation

struct Card: Hashable
{
    func hash(into hasher: inout Hasher) { hasher.combine(identifier) }
    
    static func == (lhs: Card, rhs: Card) -> Bool {
        return lhs.identifier == rhs.identifier
    }
    
    var isFaceUp: Bool = false
    var isMatched: Bool = false
    private var identifier: Int
    
    private static var identifierFactory = 0
    
    private static func getUniqueIdentifier() -> Int {
        identifierFactory += 1
        return identifierFactory
    }
    
    init(){
        self.identifier = Card.getUniqueIdentifier()
    }
}
