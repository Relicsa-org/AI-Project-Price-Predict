import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'
import { Skill } from '../types'
import { logger } from '../utils/logger'

const SKILLS_DIR = path.join(__dirname, '../../skills')

export const loadSkills = async (): Promise<Skill[]> => {
    const skills: Skill[] = []
    try {
        const categories = await fs.readdir(SKILLS_DIR)
        for (const category of categories) {
            const categoryPath = path.join(SKILLS_DIR, category)
            const stat = await fs.stat(categoryPath)
            if (stat.isDirectory()) {
                const files = await fs.readdir(categoryPath)
                for (const file of files) {
                    if (file.endsWith('.md')) {
                        const filePath = path.join(categoryPath, file)
                        const fileContent = await fs.readFile(filePath, 'utf8')
                        const { data, content: body } = matter(fileContent)

                        skills.push({
                            ...data,
                            id: `${category}/${file.replace('.md', '')}`,
                            description: body,
                            category: category
                        } as Skill);
                    }
                }
            }
        }
        logger.info(`Loaded ${skills.length} skills`);
        return skills
    } catch (error) {
        logger.error('Failed to load skills', { error })
        throw new Error('Skills load failed')
    }
}