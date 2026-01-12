"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CharacterWithCategory } from "@/lib/database.types";

interface CharacterCardProps {
  character: CharacterWithCategory;
  onEdit: (character: CharacterWithCategory) => void;
  onDelete: (id: string) => void;
  index?: number;
}

export function CharacterCard({ character, onEdit, onDelete, index = 0 }: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <Card className="group overflow-hidden bg-[#16141C] border border-[#322D3C] rounded-2xl hover:border-[#E11D48]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(225,29,72,0.2),0_0_60px_rgba(244,63,94,0.1)]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
          <Image
            src={character.image_url}
            alt={character.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-transparent to-transparent opacity-60" />
          
          {/* Hover overlay with rose tint */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#E11D48]/30 via-[#F43F5E]/10 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Action buttons */}
          <motion.div 
            className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 bg-[#16141C]/90 border border-[#322D3C] hover:border-[#E11D48] hover:bg-[#1C1923] backdrop-blur-sm rounded-xl"
                onClick={() => onEdit(character)}
              >
                <Pencil className="h-4 w-4 text-[#FAF5FF]" />
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="icon"
                variant="destructive"
                className="h-9 w-9"
                onClick={() => onDelete(character.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Category badge */}
          {character.category && (
            <motion.div 
              className="absolute bottom-3 left-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]">
                {character.category.name}
              </span>
            </motion.div>
          )}
        </div>
        
        <CardContent className="p-4 bg-[#16141C] border-t border-[#322D3C]">
          <motion.h3 
            className="font-semibold text-lg truncate text-[#FAF5FF]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 + 0.1 }}
          >
            {character.name}
          </motion.h3>
        </CardContent>
      </Card>
    </motion.div>
  );
}
